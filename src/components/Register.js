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
  return <Slide direction="up" {...props} />;
}

class Register extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      open: false,
      mailVal:"",
      passVal:"",
      nameVal: "",
      phoneVal: "",
      addrVal: "",
      instVal: "",
      userStatus: null,
      notRegistering:true,
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleRegister = () => {
    //query is user already registered
    const db = firebase.firestore();
     db.collection('guru').get().then((querySnapshot) => {
      querySnapshot.forEach(doc => {
          const dataGuru = doc.data();
          if(dataGuru){           
            if( this.state.phoneVal === dataGuru.no_hp){
              this.setState({ userStatus: "NOK" });
              return;
            }else{
              this.setState({ userStatus: "OK" });
            }
          }
      });
    });
    if(this.state.userStatus){
      if(this.state.userStatus === "OK"){
        console.log("Pendaftaran berhasil");
      }else{
        console.log("Pengguna dengan username dan no.hp ini telah teraftar");
      }
    }else{
      console.log("database query failed");
    }
    //create user from firebase   
    firebase.auth().createUserWithEmailAndPassword(this.state.mailVal, this.state.passVal)
    .then((verify)=>{
      firebase.auth().currentUser.sendEmailVerification()
      .then(this.processEmailVerification.bind(this)(verify))
        .catch(function(error) {
          console.log("Email varifikasi gagal. Mohon ganti email yang valid");
        });
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode + " | "+errorMessage);
      // ...
    });
  };

  processEmailVerification = () => {
    console.log("email terkirim, silahkan buka link aktivasi");
    this.setState({notRegistering:false});
  }

  render() {
    const { classes} = this.props;
    return (
      <div>
        <Button color="inherit" onClick={this.handleClickOpen}>
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
              <Typography variant="h6" color="inherit" className={classes.flex}>
                Daftarkan Akun
              </Typography>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>

          <DialogContent>
            <DialogContentText>
              <div>
                <br/>
                <br/>
                Mari menjadi mitra Almas Tutoring, bersama mencerdaskan anak bangsa!
                <br/>
                <br/>
              </div>
              
            </DialogContentText>
            <TextField autoFocus margin="dense" id="name" label="Email Address" type="email" value={this.state.mailVal} onChange={e => this.setState({ mailVal: e.target.value })} fullWidth
              required/>
            <TextField margin="dense" id="pass" label="Password" type="password" value={this.state.passVal} onChange={e => this.setState({ passVal: e.target.value })} fullWidth
              required/>
            <TextField margin="dense" id="longName" label="Nama Lengkap" type="text" value={this.state.nameVal} onChange={e => this.setState({ nameVal: e.target.value })} fullWidth />                
            <TextField margin="dense" id="phone" label="No.Hp/WA" type="tel" value={this.state.phoneVal} onChange={e => this.setState({ phoneVal: e.target.value })} fullWidth />
            <TextField margin="dense" id="address" label="Alamat" type="text" value={this.state.addrVal} onChange={e => this.setState({ addrVal: e.target.value })} fullWidth />
            <TextField margin="dense" id="institution" label="Institusi" type="text" value={this.state.instVal} onChange={e => this.setState({ instVal: e.target.value })} fullWidth/>
          </DialogContent>
          {
            this.state.notRegistering ?
            <DialogActions>
              <Button onClick={this.handleClose} className={classes.cancelbutton} size="large" >
                Cancel
              </Button>
              <Button onClick={this.handleRegister} className={classes.okbutton} variant="contained" size="large">
                Register
              </Button>
            </DialogActions>
            :
            <DialogActions>
              <Button href= "/" className={classes.okbutton} variant="contained" size="large">
                Verifikasi Email
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

export default withStyles(styles)(Register);
