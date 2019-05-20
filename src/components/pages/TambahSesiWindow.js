import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
// import { connect } from 'react-redux';
// import {bindActionCreators} from 'redux';
import AddIcon from '@material-ui/icons/Add';
// import * as Actions from '../store/Actions';
import Fab from '@material-ui/core/Fab';
import DropdownList from '../DropdownList';

const styles = theme => ({
  appBar: {
    position: 'relative',
    background: '#F53240',
  },
  flex: {
    flex: 1,
  },
  okbutton: {
    color:'#ffffff',
    background: '#F53240',
  },
  cancelbutton: {
    color:'#F53240',
  },
  add: {
    backgroundColor:'#F53240',
    '&:hover': {
      backgroundColor: '#c61d29',
    },
    color:'#FFFFFF',
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2, 
  },
});

function Transition(props) {
  return <Slide direction='up' {...props} />;
}

class TambahSesi extends React.Component {
  
    constructor(props) {
      super(props)

      // Bind the this context to the handler function
      // this.selectGuru = this.selectGuru.bind(this);
      // this.selectKelas = this.selectKelas.bind(this);
      // this.selectMapel = this.selectMapel.bind(this);
      // this.selectSiswa = this.selectSiswa.bind(this);

      // Set some state
      this.state = {
        open: false,
        courseName:'',
        kelas:'',
        mapel: '',
        siswa: '',
        guru: '',
        dateCreated: '',
        jenisKelas: [
          {key:0,value:'Calistung'},
          {key:1,value:'1-3 SD'},
          {key:2,value:'4-6 SD'},
          {key:3,value:'7-8 SMP'},
          {key:4,value:'9 SMP'},
          {key:5,value:'10-11 SMA'},
          {key:6,value:'12 SMA'},
          {key:7,value:'SBMPTN'}],  
      };
    }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes} = this.props;
    const {courseName,kelas,mapel,siswa,guru,dateCreated,jenisKelas} = this.state;
    return (
      <div>
        <Fab aria-label="Add" className={classes.add} onClick={this.handleOpen}>
          <AddIcon />
        </Fab>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography variant='h6' color='inherit' className={classes.flex}>
                Tambah Course
              </Typography>
              <IconButton color='inherit' onClick={this.handleClose} aria-label='Close'>
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>

          <DialogContent>
            <br/>
            <br/>
            <TextField autoFocus margin='dense' id = 'courseName' label='Nama Course' type='text' value={courseName} onChange={e => this.setState({ courseName: e.target.value })} fullWidth/>
            <DropdownList title='Kelas'   values = {jenisKelas}/>
            <DropdownList title='Guru'    values = {jenisKelas}/>
            <TextField margin='dense'     id ='mapel'     label='Mata Pelajaran'  type='text' value={mapel}   onChange={e => this.setState({ mapel: e.target.value })} fullWidth/>                
            <TextField margin='dense'     id ='guru'        label='Pengajar'      type='text'  value={guru}  onChange={e => this.setState({ guru: e.target.value })} fullWidth/>
            <TextField margin='dense'     id ='murid'      label='Siswa'        type='text' value={siswa}   onChange={e => this.setState({ siswa: e.target.value })} fullWidth/>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} className={classes.cancelbutton} size='large' >
              Cancel
            </Button>
            <Button 
              className={classes.okbutton} 
              variant='contained' 
              size='large'>
              Tambah
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

TambahSesi.propTypes = {
  classes: PropTypes.object.isRequired,
};
const TambahSesiWindow = withStyles(styles)(TambahSesi);
export default TambahSesiWindow;
// //==================================redux======================================
// const mapStateToProps = (state) => {
//   return {
//     notRegistering: state.notRegistering
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators(Actions,dispatch);
// }

// export default connect(mapStateToProps,mapDispatchToProps)(TambahSesiWindow);
