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

class SignIn extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
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
              <TextField autoFocus margin="dense" id="name" label="Email Address" type="email" fullWidth
                required/>
              <TextField margin="dense" id="pass" label="Password" type="password" fullWidth
                required/>
              <TextField margin="dense" id="user" label="Username" type="text" fullWidth
                required/>
              <TextField margin="dense" id="phone" label="No.Hp/WA" type="tel" fullWidth />
              <TextField margin="dense" id="address" label="Alamat" type="text" fullWidth />
              <TextField margin="dense" id="institution" label="Institusi" type="text" fullWidth />
            </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} className={classes.cancelbutton} size="large" >
              Cancel
            </Button>
            <Button onClick={this.handleClose} className={classes.okbutton} variant="contained" size="large">
              Sign Up
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);
