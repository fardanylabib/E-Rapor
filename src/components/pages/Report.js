import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {queryCourseList,printAll} from '../../store/Actions';
import Typography from '@material-ui/core/Typography';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import {ExcelFile,ExcelSheet} from 'react-data-export';

const styles = {
  from: {
    margin: 20,
  },
  cetak:{
    backgroundColor: '#02C8A7','&:hover': {backgroundColor: '#02B89A'},
    color: 'white',
  },  
};


class Report extends React.Component {
    state = {
        dateFrom: '',
        dateThru: '',
        isPrintAll:'0',
    }
    
    dispatchReport = ()=>{
        if(this.props.reportClass === 'Laporan Kehadiran'){
            if(this.state.isPrintAll=='1'){
                if(this.props.courses === null){
                    this.props.queryCourseList(this.props.isAdmin,this.props.email);
                }
                this.props.printAll(this.props.courses);
            }else{
    
            }
        }
    }

    componentDidMount(){
        const today = new Date();
        var month = today.getMonth() + 1;
        if(month < 10){
            month = '0' + month;
        }
        this.setState({
            dateFrom : today.getFullYear() + '-' + month + '-' + today.getDate(),
            dateThru : today.getFullYear() + '-' + month + '-' + today.getDate(),
        });
    }

    handleChangeStatus = (event) =>{
        this.setState({isPrintAll : event.target.value});
    }

    render(){
        console.log(this.state.dateFrom);   
        const {classes,isUser,reportName,reportClass} = this.props; 
        const {dateFrom,dateThru,isPrintAll} = this.state;
        if(isUser){
            return(
                <div>
                    <Typography variant='h5' >Laporan&nbsp;{reportName} </Typography>
                    <Grid container alignItems='center' justify="space-evenly">
                        <Grid item>
                            <TextField autoFocus margin='dense' id = 'start' className = {classes.from}
                                label='Dari' type='date'
                                value = {dateFrom}
                                onChange={e => this.setState({ dateFrom: e.target.value })}
                            />  
                            <TextField autoFocus margin='dense' id = 'to' className = {classes.from}
                                label='Sampai' type='date'
                                value = {dateThru}
                                onChange={e => this.setState({ dateThru: e.target.value })}
                            />  
                        </Grid>  
                        <Grid item>
                            <RadioGroup
                                aria-label='pilihan-cetak'
                                value={isPrintAll}
                                onChange={(event)=>this.handleChangeStatus(event)}
                                >
                                <FormControlLabel value={'0'} control={<Radio color='secondary'/>} 
                                    label={"Cetak untuk "+reportName+" saja"}
                                />
                                <FormControlLabel value={'1'} control={<Radio color='secondary'/>}
                                    label="Cetak semuanya"
                                />
                            </RadioGroup>
                            <Button variant="contained"  className = {classes.cetak} 
                                onClick={this.dispatchReport}
                            >
                                Cetak Laporan
                            </Button>
                        </Grid>
                    </Grid>
                    {
                        this.props.isReportReady ?
                        <ExcelFile>
                            {
                                this.props.reportSrc.map((sheet)=>(
                                    <ExcelSheet dataSet={sheet.sheetData} name = {sheet.sheetName}/>
                                ))
                            }
                        </ExcelFile>
                        :null
                    }
                </div>
            );
        }    
        return null;
    }
}

Report.propTypes = {
    classes: PropTypes.object.isRequired,
  };

const mapStateToProps = (state) => {
    return {
        isUser: state.isUser,
        reportName: state.popupTitle,
        reportClass : state.popupOptions2,
        isAdmin: state.isAdmin,
        email: state.email,
        courses: state.rows,
        reportSrc: state.reportSrc,
        isReportReady: state.isReportReady
      }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({queryCourseList, printAll},dispatch);
  }
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Report));