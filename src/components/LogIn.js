import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import GoogleLogo from '../media/icons8-google.png';
import PropTypes from 'prop-types';
import withFirebaseAuth from 'react-auth-firebase';
import FirebaseConfig from '../FirebaseConfig'

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
    email: 'fardany@gmail.com',
    password: 'password'
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };


  render() {
    const {
      // classes,
      signInWithEmail,
      signUpWithEmail,
      signInWithGoogle,
      signInWithFacebook,
      signInWithGithub,
      signInWithTwitter,
      googleAccessToken,
      facebookAccessToken,
      githubAccessToken,
      twitterAccessToken,
      twitterSecret,
      user,
      error,
      signOut
    } = this.props;

    const { email, password } = this.state;

    if(user){
      return (
        <div>
          <Button color="inherit" onClick={signOut}>
            Keluar
          </Button>
        </div>
        );
    }
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
              onChange = {e => this.setState({ email: e.target.value })}
            />
            <TextField
              margin="dense"
              id="pass"
              label="Password"
              type="password"
              fullWidth
              onChange = {e => this.setState({ password: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} style={style.cancel}>
              Cancel
            </Button>
            <Button onClick={(email, password) => signInWithEmail(email, password)} style={style.login} variant="contained">
              Log In
            </Button>
            <Button onClick={signInWithGoogle} style={style.login} variant="contained">
              Masuk Dengan &nbsp;&nbsp;
              <img src={GoogleLogo} style={style.googleLogo} alt="HTML5 Icon"/>
            </Button>
          </DialogActions>
          
        </Dialog>
      </div> 
    );
  }
}


const authConfig = {
  email: {
    verifyOnSignup: false,
    saveUserInDatabase: true
  },
  google: {
    // scopes: ["admin.datatransfer", "contacts.readonly"], // optional
    // customParams: {
    //   login_hint: "user@example.com"
    // },
    // redirect: true, // default is popup: true, redirect: true,
    returnAccessToken: true,
    // scopes: [], // array
    saveUserInDatabase: true
  },
  facebook: {
    // scopes: ["admin.datatransfer", "contacts.readonly"], // optional
    // customParams: {
    //   login_hint: "user@example.com"
    // },
    redirect: true, // default is popup: true, redirect: true,
    returnAccessToken: true,
    saveUserInDatabase: true
  },
  github: {
    // redirect: true,
    returnAccessToken: true,
    saveUserInDatabase: true
  },

  twitter: {
    // redirect: true,
    returnAccessToken: true,
    returnSecret: true,
    saveUserInDatabase: true
  }
};

LogIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

// export default App;
export default withFirebaseAuth(LogIn, FirebaseConfig, authConfig);