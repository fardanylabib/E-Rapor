import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import GoogleLogo from '../media/icons8-google.png';
// import PropTypes from 'prop-types';
import firebase from '../FirebaseConfig';

const style = {
    login:{
      background: '#02C8A7',
      color: 'white',
    },
    cancel:{
      color: '#02C8A7',
    },
    googleLogo:{
      width:20
    }
    
};

class LogIn extends React.Component {
  state = {
    open: false,
    email: "",
    password: "",
    user: false,
  };

  handleSignOut = () => {
    this.setState({ user: false });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleLogin = () => {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(this.onLoginSuccess.bind(this))
    .catch((error)=> {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode + " | "+errorMessage);
      this.onLoginFailure.bind(this)(errorMessage);
    });
  }

  onLoginSuccess = () =>{
    this.setState({
      open: false,
      user: true,
    });
  }

  onLoginFailure = (errorMessage) => {
    console.log("errornya adalah "+errorMessage);
    this.setState({
      open: false,
      user: false,
    });
  }

  render() {
    const { user } = this.state;
    if(!user){
      console.log("user = "+ user);
      return (
        <div>
          <Button color="inherit" onClick={this.handleClickOpen}>
            Masuk
          </Button>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Masuk</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Sudah punya akun? Silahkan login
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
                value = {this.state.email}
                onChange = {e => this.setState({ email: e.target.value })}
              />
              <TextField
                margin="dense"
                id="pass"
                label="Password"
                type="password"
                fullWidth
                value = {this.state.password}
                onChange = {e => this.setState({ password: e.target.value })}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} style={style.cancel}>
                Cancel
              </Button>
              <Button onClick={this.handleLogin} style={style.login} variant="contained">
                Log In
              </Button>
              {/* <Button onClick={signInWithGoogle} style={style.login} variant="contained">
                Masuk Dengan &nbsp;&nbsp;
                <img src={GoogleLogo} style={style.googleLogo} alt="HTML5 Icon"/>
              </Button> */}
            </DialogActions>
            
          </Dialog>
        </div> 
      );
    }
    else{
      console.log("user = "+ user);
      return (
        <div>
          <Button color="inherit" onClick={this.handleSignOut}>
            Keluar
          </Button>
        </div>
      );
    }
  }
}

// LogIn.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default App;
export default LogIn;