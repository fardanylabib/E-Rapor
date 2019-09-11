import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {handlePopup,handlePopupCancel,handleOptions1,handleOptions2} from '../../store/Actions';
import { withRouter, Link } from 'react-router-dom';

const style = {
    button: {
      margin: 6,
    },
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
  state = {
    showDeleteBtn : true,
  }
  
  render() {
    if(!this.props.open){
        return null; 
    }
    else{
      if(this.props.title.includes('menghapus')){
        if(this.state.showDeleteBtn){
          this.setState({ showDeleteBtn: false });
        }
      }else{
        if(!this.state.showDeleteBtn){
          this.setState({ showDeleteBtn: true });
        }
      }
      // console.log('contentnya :'+JSON.stringify(this.props.content));
      return (
        <div>        
          <Dialog
            open={true}
            onClose={this.props.handlePopupCancel}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title" style={{ textAlign: 'center' }}>
              {this.props.title}
              {
                this.state.showDeleteBtn?       
                <IconButton  onClick={() => this.props.handlePopup(true,'Anda yakin akan menghapus '+this.props.title+' ?','Hapus',null,null,this.props.doc)}  style={style.button}>
                  <DeleteIcon />
                </IconButton>
                :
                null
              }
            </DialogTitle>
            {
              this.props.content === null ? null:
              this.props.content.map(contentItem => 
              <Typography style={{ textAlign: 'center' }} key = {contentItem.key}> 
                {contentItem.content}
              </Typography>)
            }
            <DialogActions>
              {
                this.props.options1?
                <Button variant="contained"  style={style.options1} onClick = {() => this.props.handleOptions1(this.props.options1,this.props.doc,this.props.email,this.props.isAdmin)}>
                  {this.props.options1}
                </Button>
                :
                null
              }
              {
                this.props.options2?
                <Button component={Link} variant="contained" style={style.options2} to='/report'
                  onClick = {()=>this.props.handleOptions2(this.props.options2, this.props.title)}
                >
                  {this.props.options2}
                </Button>
                :
                null
              }
              <Button onClick={this.props.handlePopupCancel} style={style.cancel}>
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
    doc: state.doc,
    isAdmin: state.isAdmin,
    email: state.email
  }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({handlePopup,handlePopupCancel,handleOptions1,handleOptions2},dispatch);
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(PopupWindow));
