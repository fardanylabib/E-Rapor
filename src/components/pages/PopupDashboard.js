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
import {handlePopup} from '../../store/Actions';

const style = {
    PopupDashboard:{
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

class PopupDashboard extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      open: false,
      tempEmail:"",
      tempPass:""
    };
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const {tempEmail,tempPass,open} = this.state;
    if(!this.props.popupOpen){
        return null; 
    }
    else{
      return (
        <div>        
          <Dialog
            open={true}
            onClose={() => this.props.handlePopup(false)}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Masuk</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Sudah punya akun? Silahkan PopupDashboard
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
              <Button onClick={() => this.props.handlePopup(false)} style={style.cancel}>
                Cancel
              </Button>
              <Button variant="contained">
                Log In
              </Button>
              {/* <Button onClick={signInWithGoogle} style={style.PopupDashboard} variant="contained">
                Masuk Dengan &nbsp;&nbsp;
                <img src={GoogleLogo} style={style.googleLogo} alt="HTML5 Icon"/>
              </Button> */}
            </DialogActions>
            
          </Dialog>
          
        </div>
      );
    }
  }
}

//redux
const mapStateToProps = (state) => {
  return {
    popupOpen: state.popupOpen
  }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({handlePopup},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(PopupDashboard);
