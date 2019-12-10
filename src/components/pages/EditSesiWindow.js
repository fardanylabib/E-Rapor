import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {simpanSesi,closeEditor,openMessage,nextStep,prevStep} from '../../store/Actions';
import InfiniteCalendar from 'react-infinite-calendar';
import MasonryLayout from 'react-masonry-layout'

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import 'react-infinite-calendar/styles.css';

import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import DateIcon from '@material-ui/icons/DateRange';
import BackIcon from '@material-ui/icons/ArrowBack';
import CheckIcon from '@material-ui/icons/Check';
import SessionIcon from '@material-ui/icons/EventNote';

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
  },
  mansonry:{
    margin: theme.spacing.unit
  },
  nav: {
    width: '100%',
    bottom: '0px',
    position:'fixed',
    zIndex:100,
  },
  calendar:{
    margin:'0 auto 0 auto'
  },
  // cardContent:{
  //   :'10px'
  // }
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

let today = new Date().toString();

const titles = ['Pilih Tanggal Mengajar', 'Daftar Sesi', 'Detail Sesi'];

function TransitionUp(props) {
  return <Slide direction='up' {...props} />;
}

class EditSesi extends React.Component {
  
  constructor(props) {
    super(props);
    // Set some state
    this.state = {
      courseDetail: [],
      perPage: 10,
      items: Array(20).fill(),
      selectedDate: today,
      localPertemuan:[],
      navId:1,
    }
  }

  loadItems = () => {
    this.setState({
      items: this.state.items.concat(Array(this.state.perPage).fill())
    });
  }

  handleChangeStatus = (event,tanggal) =>{
      let pertemuanCopy = this.state.localPertemuan.slice();
      console.log('pertemuan copy = '+JSON.stringify(pertemuanCopy));
      console.log('pertemuan date = '+tanggal);
      for(let i = 0;i<pertemuanCopy.length;i++){
        if(pertemuanCopy[i].date === tanggal){
          console.log('pertemuan date masuk = '+tanggal);
          pertemuanCopy[i].status = event.target.value;
          this.setState({localPertemuan: pertemuanCopy});
          break;
        }
      }
  }

  handleAlasanCancel = (event,tanggal) => {
    let pertemuanCopy = this.state.localPertemuan.slice();
    for(let i = 0;i<pertemuanCopy.length;i++){
      if(pertemuanCopy[i].date === tanggal){
        pertemuanCopy[i].cancelling = event.target.value;
        this.setState({localPertemuan: pertemuanCopy});
        break;
      }
    }
  }

  handleKeterangan = (event,tanggal) => {
    let pertemuanCopy = this.state.localPertemuan.slice();
    for(let i = 0;i<pertemuanCopy.length;i++){
      if(pertemuanCopy[i].date === tanggal){
        pertemuanCopy[i].keterangan = event.target.value;
        this.setState({localPertemuan: pertemuanCopy});
        break;
      }
    }
  }

  simpan = () => {
    /*
    Course Bundle:
    - Date
    - Status (cancel/complete/pending)-> -1/1/0
    - Alasan Cancel
    - Keterangan
    */
    const {courseDoc} = this.props;
    const {selectedDate,localPertemuan} = this.state;
    let dataPertemuan = localPertemuan;
    if(dataPertemuan[0]){
      for(let course of dataPertemuan){
        if(course.date === selectedDate){
          this.props.openMessage('error','Sudah ada kelas di hari tersebut');
          return;
        }
      }
    }
    //jika course baru
    dataPertemuan.push({
      'date'        : selectedDate,
      'status'      : '0',
      'cancelling'  : '',
      'keterangan'  : '',
    });
    this.props.simpanSesi(dataPertemuan,courseDoc.detail_sesi);
  }

  simpanSesi = (dataPertemuan,detailSesi) =>{
    this.props.simpanSesi(dataPertemuan,detailSesi);
    this.props.closeEditor();
  }

  render() {
    const { selectedDate,localPertemuan,navId} = this.state;
    const { classes, openEditor,docId,step,courseBundle,courseDoc} = this.props;
    console.log('open editor = '+openEditor);
    console.log('selected date = '+selectedDate);
    console.log('course ID = '+docId);
    console.log('course Bundle = '+JSON.stringify(localPertemuan));

    return (
        <Dialog
          fullScreen
          open={openEditor}
          onEnter = {()=>this.setState({localPertemuan : courseBundle.pertemuan})}
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
            <div>
               <InfiniteCalendar
                  width={(window.innerWidth <= 650) ? window.innerWidth : 650}
                  height={window.innerHeight - 330}
                  selected={today}
                  onSelect={(date)=>this.setState({selectedDate:date.toString()})}
                  className = {classes.calendar}
                />

              <BottomNavigation
                value={navId}
                onChange={(event, newValue) => {
                  this.setState({navId:newValue});
                }}
                showLabels
                className={classes.nav}
              >
                <BottomNavigationAction onClick={this.props.closeEditor} label='Kembali' icon={<BackIcon />} />
                <BottomNavigationAction onClick={this.simpan} label='Pilih' icon={<CheckIcon />} />
                <BottomNavigationAction onClick={this.props.nextStep} label='Daftar Sesi' icon={<SessionIcon/>} />
              </BottomNavigation>
            </div>
            : 
            step == 1 ?
            <div>
              <MasonryLayout
                id="masonry-layout"
                infiniteScroll={this.loadItems}
                >
                {
                  localPertemuan.map((pertemuan) => {
                  return (
                    <div
                      key={pertemuan.date}
                      style={{width: '200px',color: 'black',
                              display: 'block',background: '#E7EAED',margin: '10px', padding:'10px'
                            }}>
                        <Typography variant='h6'align='center'>
                          {pertemuan.date.substring(0,15)}
                        </Typography>
                        <div >
                          <RadioGroup
                            aria-label='Status'
                            value={pertemuan.status}
                            onChange={(event)=>this.handleChangeStatus(event,pertemuan.date)}
                          >
                            <FormControlLabel value={'0'} control={<Radio color='default'/>} label="Pending" />
                            <FormControlLabel value={'1'} control={<Radio color='primary'/>} label="Completed" />
                            <FormControlLabel value={'-1'} control={<Radio color='secondary'/>} label="Cancelled" />
                          </RadioGroup>       
                          {
                            pertemuan.status == '-1'?
                            <div>
                              <Typography>
                                Alasan Cancel:
                              </Typography>
                              <textarea rows={3} value={pertemuan.cancelling} onChange={(event) =>this.handleAlasanCancel(event,pertemuan.date)}/>
                            </div>
                            :null
                          }   
                          <Typography>
                            Keterangan:
                          </Typography>
                          <textarea rows={3} value={pertemuan.keterangan} onChange={(event) =>this.handleKeterangan(event,pertemuan.date)}/>
                        </div>
                    </div>
                  )}
                )}
      
              </MasonryLayout>
              <BottomNavigation
                value={navId}
                onChange={(event, newValue) => {
                  this.setState({navId:newValue});
                }}
                showLabels
                className={classes.nav}
              >
                <BottomNavigationAction onClick={this.props.prevStep} label='Pilih Tanggal' icon={<DateIcon />} />
                <BottomNavigationAction onClick={() => this.simpanSesi(localPertemuan,courseDoc.detail_sesi)} label='Simpan Perubahan' icon={<SaveIcon />} />
                <BottomNavigationAction onClick={this.props.closeEditor} label='Tutup' icon={<CloseIcon/>} />
              </BottomNavigation>
            </div>
            :null
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
    courseDoc: state.doc,
    openEditor: state.openEditor,
    docId: state.selectedCourse,
    courseBundle: state.courseBundle,
    queried: state.courseDtlQueried,
    step: state.sessionStep
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({simpanSesi,closeEditor,openMessage,nextStep,prevStep},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(EditSesiWindow);
