
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
import { connect } from 'react-redux';
// import {bindActionCreators} from 'redux';
import * as Actions from '../../store/Actions';

import firebase from '../../FirebaseConfig';
const JSON = require('circular-json');
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

let counter = 0;

function createData(sesi, guru, kelas, mapel, murid) {
  counter += 1;
  return { id: counter, sesi, guru, kelas, mapel, murid};
}

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit,
  },
  table: {
    minWidth: 200,
  },
  // tableWrapper: {
  //   overflowX: 'auto',
  // },
});

const CustomTableCell = withStyles(theme => ({
  
  head: {
    backgroundColor: '#F9BE02',
    color: theme.palette.common.white,
    fontSize: 14,
  },
  body: {
    fontSize: 12,
  },
}))(TableCell);

class CustomPaginationActionsTable extends React.Component {
  state = {
    rows: [],
    page: 0,
    rowsPerPage: 5,
    hasQueried:false
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  queryDashboard(){
    const db = firebase.firestore();
    if(this.props.isAdmin){
      let tempRows = [];
      db.collection('sesi').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const dataSesi = doc.data();
          if(dataSesi){
            const dataGuru = dataSesi.guru;
            var namaGuru = '';
            if(dataGuru){
              dataGuru.get().then((result)=>{
                namaGuru = result.data().username;
                tempRows.push(createData(dataSesi.nama_sesi, namaGuru, dataSesi.kelas, dataSesi.mapel[0], 'saimin'));
                
              });
            }else{
              tempRows.push(createData(dataSesi.nama_sesi, 'tidak ada', dataSesi.kelas, dataSesi.mapel[0], 'saimin'));
            }
            //push setiap sesi disini
            // console.log(dataSesi.nama_sesi +" "+ namaGuru +" "+ dataSesi.kelas +" "+ dataSesi.mapel[0] +" "+ "saimin") ;         
          }
        });
      }).then(()=>{
        tempRows.sort((a, b) => (a.sesi < b.sesi ? -1 : 1));
        this.setState({ rows : tempRows,  hasQueried : true});
      });
    }
  }

  render() {
    const { classes } = this.props;
    const { rows, rowsPerPage, page,hasQueried} = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    if(this.props.isUser && !hasQueried){
      console.log("sudah user query");
      this.queryDashboard(); 
    }else{
      console.log("belum user query");
    }
    console.log(rows) ;
    //labibfardany
    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell>Course</CustomTableCell>
                <CustomTableCell align="center">Guru</CustomTableCell>
                <CustomTableCell align="center">Kelas</CustomTableCell>
                <CustomTableCell align="center">Mata Pelajaran</CustomTableCell>
                <CustomTableCell align="center">Siswa</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                //sesi, guru, kelas, mapel, murid}
                rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                <TableRow key={row.id}>
                  <CustomTableCell component="th" scope="row">{row.sesi}</CustomTableCell>
                  <CustomTableCell align="center">{row.guru}</CustomTableCell>
                  <CustomTableCell align="center">{row.kelas}</CustomTableCell>
                  <CustomTableCell align="center">{row.mapel}</CustomTableCell>
                  <CustomTableCell align="center">{row.murid}</CustomTableCell>
                </TableRow>
                ))
              }
              {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <CustomTableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    native: true,
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActionsWrapped}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    );
  }
}

CustomPaginationActionsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

//redux
const mapStateToProps = (state) => {
  return {
    isAdmin: state.isAdmin,
    isUser: state.isUser
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators(Actions,dispatch);
// }

const MyDashboard = withStyles(styles)(CustomPaginationActionsTable);

export default connect(mapStateToProps,null)(MyDashboard);


