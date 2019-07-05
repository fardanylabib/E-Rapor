import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {simpanSesi,closeEditor,queryCourseDetail,openMessage} from '../../store/Actions';
import InfiniteCalendar from 'react-infinite-calendar';
import MasonryLayout from 'react-masonry-layout'

import 'react-infinite-calendar/styles.css';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const styles = theme => ({
  appBar: {
    position: 'relative',
    background: '#F53240',
  },
  flex: {
    flex: 1,
  },
  okbutton: {
    margin: theme.spacing.unit,
    background:'#F53240',
    '&:hover': {
      background: '#c61d29',
    },
    color:'#FFFFFF',
  },
  cancelbutton: {
    margin: theme.spacing.unit,
    color:'#F53240',
  },
  buttongroup:{
    position: 'fixed',
    bottom: theme.spacing.unit,
  }
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

let today = new Date().toString();

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const titles = ['Pilih Tanggal Mengajar', 'Daftar Sesi', 'Detail Sesi'];

function TransitionUp(props) {
  return <Slide direction='up' {...props} />;
}

class EditSesi extends React.Component {
  
  constructor(props) {
    super(props);
    // Set some state
    this.state = {
      step : 0,
      courseDetail: [],
      perPage: 10,
      items: Array(20).fill(),
      selectedDate: today,
      queried:false
    }
  }

  loadItems = () => {
    this.setState({
      items: this.state.items.concat(Array(this.state.perPage).fill())
    });
  }


  simpan = () => {
    /*
    Course Bundle:
    - Date
    - Status (cancel/complete/pending)-> -1/1/0
    - Alasan Cancel
    - Keterangan
    */
    const {docId, courseList,courseBundle} = this.props;
    const {queried, courseDetail,selectedDate} = this.state;
    if(!queried){
      this.props.queryCourseDetail(courseList[docId].detail_sesi);
    }
    if(courseBundle.courses){
      for(let course of courseBundle.courses){
        if(course.date === selectedDate){
          this.props.openMessage('error','Sudah ada kelas di hari tersebut');
          return;
        }
      }
    }
    let buff = [];
    buff.push({
      'date'        : selectedDate,
      'status'      : 0,
      'cancelling'  : '',
      'keterangan'  : '',
    });
    this.props.simpanSesi(buff);
  }

  render() {
    const { step,selectedDate} = this.state;
    const { classes, openEditor} = this.props;
    console.log('open editor = '+openEditor);
    console.log('selected date = '+selectedDate);
    console.log('course ID = '+this.props.docId);
    console.log('course Bundle = '+JSON.stringify(this.props.courseBundle));
    return (
        <Dialog
          fullScreen
          open={openEditor}
          onClose={this.props.closeEditor}
          TransitionComponent={TransitionUp}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography variant='h6' color='inherit' className={classes.flex}>
                {titles[step]}
              </Typography>
              <IconButton color='inherit' onClick={this.props.closeEditor} aria-label='Close'>
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <br/>
          {
            step == 0 ?
            <Grid container alignContent='center' alignItems='center' justify='center'>
                <InfiniteCalendar
                  width={(window.innerWidth <= 650) ? window.innerWidth : 650}
                  height={window.innerHeight - 330}
                  selected={today}
                  onSelect={(date)=>this.setState({selectedDate:date.toString()})}
                />
              <br/>
              <Paper className={classes.buttongroup}>
                <Button onClick={this.props.closeEditor} className={classes.cancelbutton} size='large' >
                  Kembali
                </Button>    
                <Button 
                  onClick={this.simpan}
                  className={classes.okbutton} 
                  variant='contained' 
                  size='large'>
                  Pilih
                </Button>
                <Button 
                  onClick={() => this.setState({step: step+1})}
                  className={classes.cancelbutton} 
                  size='large'>
                  Daftar Sesi<ChevronRightIcon/>
                </Button>
              </Paper>
            </Grid>
            : 
            step == 1 ?
            <Grid container alignContent='center' alignItems='center' justify='center'>
              <MasonryLayout
                id="masonry-layout"
                infiniteScroll={this.loadItems}>
      
                {this.state.items.map((v, i) => {
                  let height = i % 2 === 0 ? 200 : 100;
                  return (
                    <div
                      key={i}
                      style={{
                        width: '100px',
                        height: `${height}px`,
                        lineHeight: `${height}px`,
                        color: 'white',
                        fontSize: '32px',
                        display: 'block',
                        background: 'rgba(0,0,0,0.7)'
                      }}>
                      {i}
                    </div>
                  )}
                )}
      
              </MasonryLayout>
              <Paper className={classes.buttongroup}>
                <Button onClick={() => this.setState({step: step-1})} className={classes.cancelbutton} size='large' >
                  <ChevronLeftIcon/>Pilih Tanggal
                </Button>    
                <Button 
                  onClick={() => this.props.simpanSesi(this.state.courseDetail)}
                  className={classes.okbutton} 
                  variant='contained' 
                  size='large'>
                  Pilih
                </Button>
                <Button 
                  onClick={() => this.setState({step: step+1})}
                  className={classes.cancelbutton} 
                  size='large'>
                  Detail Sesi<ChevronRightIcon/>
                </Button>
              </Paper>
            </Grid>
            :
            <Grid container container alignContent='center' alignItems='center' justify='center'>
              <Paper className={classes.buttongroup}>
                <Button onClick={() => this.setState({step: step-1})} className={classes.cancelbutton} size='large' >
                  <ChevronLeftIcon/>Daftar Sesi
                </Button>    
                <Button 
                  onClick={() => this.props.simpanSesi(this.state.courseDetail)}
                  className={classes.okbutton} 
                  variant='contained' 
                  size='large'>
                  Simpan Perubahan
                </Button>
                <Button 
                  onClick={this.props.closeEditor}
                  className={classes.cancelbutton} 
                  size='large'>
                  Tutup
                </Button>
              </Paper>
            </Grid>
          } 
        </Dialog>
    );
  }
}

EditSesi.propTypes = {
  classes: PropTypes.object.isRequired,
};
const EditSesiWindow = withStyles(styles)(EditSesi);
// //==================================redux======================================
const mapStateToProps = (state) => {
  return {
    courseList: state.rows,
    openEditor: state.openEditor,
    docId: state.selectedCourse,
    courseBundle: state.courseBundle
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({simpanSesi,closeEditor,queryCourseDetail,openMessage},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(EditSesiWindow);
