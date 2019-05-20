import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {handlePopup} from '../../store/Actions';

const style = {
    options1:{
      background: '#02C8A7',
      color: 'white',
    },  
    options2:{
      background: '#F9BE02',
      color: 'white',
    },
    cancel:{
      color: '#02C8A7',
    },
};

class PopupWindow extends React.Component {
  
  render() {
    if(!this.props.open){
        return null; 
    }
    else{
      console.log('contentnya :'+JSON.stringify(this.props.content));
      return (
        <div>        
          <Dialog
            open={true}
            onClose={() => this.props.handlePopup(false,null,null,null,null)}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title" style={{ textAlign: 'center' }}>
              {this.props.title}
            </DialogTitle>
            {
              this.props.content === null ? null:
              this.props.content.map(content => 
              <Typography style={{ textAlign: 'center' }} key = {content.index}> 
                {content.content}
              </Typography>)
            }
            <DialogActions>
              <Button variant="contained"  style={style.options1}>
                {this.props.options1}
              </Button>
              <Button variant="contained" style={style.options2}>
                {this.props.options2}
              </Button>
              <Button onClick={() => this.props.handlePopup(false,null,null,null,null)} style={style.cancel}>
                Kembali
              </Button>
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
    open: state.popupOpen,
    title: state.popupTitle,
    options1: state.popupOptions1,
    options2: state.popupOptions2,
    content: state.popupContent,
  }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({handlePopup},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(PopupWindow);
