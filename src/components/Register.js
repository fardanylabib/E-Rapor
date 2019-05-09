import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import firebase from '../FirebaseConfig';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../store/Actions';

const styles = {
  appBar: {
    position: 'relative',
    background: '#F9BE02',
  },
  flex: {
    flex: 1,
  },
  okbutton: {
    color:'#ffffff',
    background: '#F9BE02',
  },
  cancelbutton: {
    color:'#F9BE02',
    },
  
};

function Transition(props) {
  return <Slide direction='up' {...props} />;
}

class Register extends React.Component {
  
  state = {
    open: false,
    mailVal:'',
    passVal:'',
    nameVal: '',
    phoneVal: '',
    addrVal: '',
    instVal: '',
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes} = this.props;
    const {mailVal,passVal,nameVal,phoneVal,addrVal,instVal} = this.state;
    return (
      <div>
        <Button color='inherit' onClick={this.handleClickOpen}>
          Daftar
        </Button>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography variant='h6' color='inherit' className={classes.flex}>
                Daftarkan Akun
              </Typography>
              <IconButton color='inherit' onClick={this.handleClose} aria-label='Close'>
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>

          <DialogContent>
            <DialogContentText>
                <br/>
                <br/>
                Mari menjadi mitra Almas Tutoring, bersama mencerdaskan anak bangsa!
                <br/>
                <br/>              
            </DialogContentText>
            <TextField autoFocus margin='dense' id='name' label='Email Address' type='email' value={mailVal} onChange={e => this.setState({ mailVal: e.target.value })} fullWidth
              required/>
            <TextField margin='dense' id='pass' label='Password' type='password' value={passVal} onChange={e => this.setState({ passVal: e.target.value })} fullWidth
              required/>
            <TextField margin='dense' id='longName'     label='Nama Lengkap'  type='text' value={nameVal}   onChange={e => this.setState({ nameVal: e.target.value })} fullWidth
              required/>                
            <TextField margin='dense' id='phone'        label='No.Hp/WA'      type='tel'  value={phoneVal}  onChange={e => this.setState({ phoneVal: e.target.value })} fullWidth
              required/>
            <TextField margin='dense' id='address'      label='Alamat'        type='text' value={addrVal}   onChange={e => this.setState({ addrVal: e.target.value })} fullWidth/>
            <TextField margin='dense' id='institution'  label='Institusi'     type='text' value={instVal}   onChange={e => this.setState({ instVal: e.target.value })} fullWidth/>
          </DialogContent>
          {
            this.props.notRegistering ?
            <DialogActions>
              <Button href= '/' className={classes.okbutton} variant='contained' size='large'>
                Konfirmasi Verifikasi
              </Button>
            </DialogActions>
            :
            <DialogActions>
              <Button onClick={this.handleClose} className={classes.cancelbutton} size='large' >
                Cancel
              </Button>
              <Button onClick={() => this.props.handleRegister(mailVal,passVal,nameVal,phoneVal,addrVal,instVal)}
                className={classes.okbutton} 
                variant='contained' 
                size='large'>
                Register
              </Button>
            </DialogActions>
          }
        </Dialog>
      </div>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};
const Registration = withStyles(styles)(Register);

//==================================redux======================================
const mapStateToProps = (state) => {
  return {
    notRegistering: state.notRegistering
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Actions,dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Registration);


