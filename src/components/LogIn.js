import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  okbutton: {
    color:'#ffffff',
    background: '#02C8A7',
  },
  cancelbutton: {
    color:'#02C8A7',
    },
  
};

class LogIn extends React.Component {
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
            />
            <TextField
              margin="dense"
              id="pass"
              label="Password"
              type="password"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} className={classes.cancelbutton}>
              Cancel
            </Button>
            <Button onClick={this.handleClose} className={classes.okbutton} variant="contained">
              Log In
            </Button>
          </DialogActions>
          
        </Dialog>
        {/* <PersistentDrawerLeft sendFunction = {this.handleClickOpen}/> */}
      </div> 
    );
  }
}

LogIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LogIn);