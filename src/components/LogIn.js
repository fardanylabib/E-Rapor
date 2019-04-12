import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../store/Actions';

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
  
  constructor(props){
    super(props);
    this.state = {
      open: false,
      tempEmail:"",
      tempPass:""
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const {tempEmail,tempPass,open} = this.state;
    console.log(this.props);
    if(!this.props.user){
      return (
        <div>
          <Button color="inherit" onClick={this.handleClickOpen}>
            Masuk
          </Button>
          
          <Dialog
            open={open}
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
                value = {tempEmail}
                onChange = {e => this.setState({ tempEmail: e.target.value })}
              />
              <TextField
                margin="dense"
                id="pass"
                label="Password"
                type="password"
                fullWidth
                value = {tempPass}
                onChange = {e => this.setState({ tempPass: e.target.value })}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} style={style.cancel}>
                Cancel
              </Button>
              <Button onClick={() => this.props.handleSignIn(tempEmail,tempPass)} style={style.login} variant="contained">
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
      return (
        <div>
          <Button color="inherit" onClick={this.props.handleSignOut}>
            Keluar
          </Button>
        </div>
      );
    }
  }
}

//redux
const mapStateToProps = (state) => {
  return {
    user: state.isUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Actions,dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(LogIn);