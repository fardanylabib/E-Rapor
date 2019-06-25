
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import RefreshIcon from '@material-ui/icons/Refresh';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import {queryCourseList,handlePopup} from '../../store/Actions';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import PopupWindow from './PopupWindow';
import TambahSesiWindow from './TambahSesiWindow';


const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    // marginLeft: theme.spacing.unit * 2.5,
  },
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#F9BE02',
    color: theme.palette.common.white,
    fontSize: 14,
    align:'center',
    padding: 'dense'
  },
  body: {
    fontSize: 12,
    align:'center',
    padding: 'dense'
  },
}))(TableCell);


class CustomPaginationActionsTable extends React.Component {
  state = {
    page: 0,
    rowsPerPage: 5,
    popup: false,
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  render() {
    const { classes,isAdmin,email,rows } = this.props;
    const { rowsPerPage, page} = this.state;

    if(rows){
      const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
      let namaMurid = [];
      for(let row of rows){
        let namaMuridPerRow = [];
        if(row.murid.length > 1){
          namaMuridPerRow.push({key:0,content:'Jumlah Siswa: '+ row.murid.length + ' (Kelompok)'});
          let counter=1;
          for(let individu of row.murid){
            namaMuridPerRow.push({key: counter, content: individu});
            counter++;
          }
        }else{
          namaMuridPerRow.push({key: 0, content:'Jumlah Siswa: 1 (Individu)'});
          namaMuridPerRow.push({key: 1, content: row.murid[0]});
        }
        namaMurid.push(namaMuridPerRow);
      }
      console.log('muridnya = '+JSON.stringify(namaMurid));
      //labibfardany
      return (
        !this.props.isUser?
        null:
        <div>
        <Paper >
          <div >
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <CustomTableCell >Course</CustomTableCell>
                  <CustomTableCell >Guru</CustomTableCell>
                  <CustomTableCell >Kelas</CustomTableCell>
                  <CustomTableCell >Mata Pelajaran</CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  //sesi, guru, kelas, mapel, murid}
                  rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                  <TableRow key={row.id}>
                    <CustomTableCell component="th" scope="row" >
                      <Button fullWidth onClick={() => this.props.handlePopup(true,row.nama_sesi, 'Mengajar','Laporan Kehadiran',namaMurid[row.key],row.id)}>
                        {row.nama_sesi}
                      </Button>
                    </CustomTableCell>
                    <CustomTableCell >{row.guru}</CustomTableCell>
                    <CustomTableCell >{row.kelas}</CustomTableCell>
                    <CustomTableCell >{row.mapel}</CustomTableCell>
                  </TableRow>
                  ))
                }
                {emptyRows > 0 && (
                  <TableRow style={{ height: 48 * emptyRows }}>
                    <CustomTableCell colSpan={4} />
                 </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    colSpan={2}
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    // SelectProps={{
                    //   native: true,
                    // }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActionsWrapped}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </Paper>
        <TambahSesiWindow/>
        <Fab aria-label="Add" className={classes.refreshBtn} onClick={()=>this.props.queryCourseList(isAdmin,email)}>
          <RefreshIcon />
        </Fab>
        <PopupWindow/>
        </div>
      );
    }
  }
}

CustomPaginationActionsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  // root: {
  //   width: '100%',
  //   marginTop: theme.spacing.unit,
  // },
  table: {
    minWidth: 100,
    padding: 'dense'
  },
  refreshBtn:{
    backgroundColor:'#F9BE02', //yellow
    '&:hover': {
      backgroundColor: '#ce9d02', //darken yellow
    },
    color:'#FFFFFF',
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 10, 
  }
});

const Dashboard = withStyles(styles)(CustomPaginationActionsTable);



//==========================================redux==========================================
const mapStateToProps = (state) => {
  return {
    isUser: state.isUser,
    rows: state.rows,
    email: state.email,
    isAdmin: state.isAdmin
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({queryCourseList,handlePopup},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);


