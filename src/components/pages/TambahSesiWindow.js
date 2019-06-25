import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';

import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import AddIcon from '@material-ui/icons/Add';
import {queryGuru,queryKelas,queryMapel,querySiswa,tambahSesi} from '../../store/Actions';
import Fab from '@material-ui/core/Fab';

const styles = theme => ({
  appBar: {
    position: 'relative',
    background: '#F53240',
  },
  flex: {
    flex: 1,
  },
  okbutton: {
    background:'#F53240',
    '&:hover': {
      background: '#c61d29',
    },
    color:'#FFFFFF',
  },
  cancelbutton: {
    color:'#F53240',
  },
  add: {
    background:'#F53240',
    '&:hover': {
      background: '#c61d29',
    },
    color:'#FFFFFF',
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2, 
  },
  formControl: {
    margin: theme.spacing.unit,
    width: '45%',
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function Transition(props) {
  return <Slide direction='up' {...props} />;
}

class TambahSesi extends React.Component {
  
    constructor(props) {
      super(props);
      // Set some state
      this.state = {
        open: false,
        openListGuru:false,
        openListKelas: false,
        courseName:'',
        guruPilihan:'',
        kelasPilihan:'',
        siswaPilihan:[],
        mapelPilihan:[], 
      }
    }

  handleOpen = () => {
    this.setState({ open: true });
    if(this.props.guru.length === 0){
      //guru belum diquery
      this.props.queryGuru();
    }
    if(this.props.guru.length === 0){
      //siswa belum diquery
      this.props.querySiswa();
    }
    if(this.props.guru.length === 0){
      //kelas belum diquery
      this.props.queryKelas();
    }
    if(this.props.guru.length === 0){
      //mapel belum diquery
      this.props.queryMapel();
    }
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChangePilihSiswa = event => {
    this.setState({ siswaPilihan: event.target.value });
  };

  handleChangePilihMapel = event => {
    this.setState({ mapelPilihan: event.target.value });
  };

  render() {
    const { classes, guru, siswa, kelas, mapel} = this.props;
    const {open, courseName, openListGuru, openListKelas,
            guruPilihan, siswaPilihan,mapelPilihan,kelasPilihan,} = this.state;
    console.log('Siswa Pilihan : '+JSON.stringify(this.state.siswaPilihan));
    console.log('Mapel Pilihan : '+JSON.stringify(this.state.mapelPilihan));
    return (
      <div>
        <Fab aria-label="Add" className={classes.add} onClick={this.handleOpen}>
          <AddIcon />
        </Fab>
        <Dialog
          fullScreen
          open={open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography variant='h6' color='inherit' className={classes.flex}>
                Tambah Course
              </Typography>
              <IconButton color='inherit' onClick={this.handleClose} aria-label='Close'>
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>

          <DialogContent>
            <br/>
            <br/>
            <TextField autoFocus margin='dense' id = 'courseName' label='Nama Course' type='text' value={courseName} onChange={e => this.setState({ courseName: e.target.value })} fullWidth/>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="drop-down-list-1">Pilih Guru</InputLabel>
              <Select
                open={openListGuru}
                onClose={() => this.setState({openListGuru:false})}
                onOpen={() => this.setState({openListGuru:true})}
                onChange={this.handleChange}
                value={guruPilihan}
                inputProps={{
                  name: 'guruPilihan',
                  id: 'drop-down-list-1',
                }}
              >
                <MenuItem value=""/>
                {
                    guru.map(data => 
                        <MenuItem key={data.key} value={data.username}>{data.username}</MenuItem>
                    )
                }
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="drop-down-list-3">Pilih Kelas</InputLabel>
              <Select
                open={openListKelas}
                onClose={() => this.setState({openListKelas:false})}
                onOpen={() => this.setState({openListKelas:true})}
                onChange={this.handleChange}
                value={kelasPilihan}
                inputProps={{
                  name: 'kelasPilihan',
                  id: 'drop-down-list-3',
                }}
              >
                <MenuItem value=""/>
                {
                    kelas.map(data => 
                        <MenuItem key={data.key} value={data.value}>{data.value}</MenuItem>
                    )
                }
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="select-multiple-checkbox">Pilih Siswa</InputLabel>
              <Select
                multiple
                value={siswaPilihan}
                onChange={this.handleChangePilihSiswa}
                input={<Input id="select-multiple-checkbox" />}
                renderValue={selected => selected.join(', ')}
                MenuProps={MenuProps}
              >
                {siswa.map(data => (
                  <MenuItem key={data.key} value={data.username}>
                    <Checkbox checked={siswaPilihan.indexOf(data.username) > -1} />
                    <ListItemText primary={data.username} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
{/*             
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="drop-down-list-2">Pilih Siswa</InputLabel>
              <Select
                open={openListSiswa}
                onClose={() => this.setState({openListSiswa:false})}
                onOpen={() => this.setState({openListSiswa:true})}
                onChange={this.handleChange}
                value={siswaPilihan}
                inputProps={{
                  name: 'siswaPilihan',
                  id: 'drop-down-list-2',
                }}
              >
                <MenuItem value=""/>
                {
                    siswa.map(data => 
                        <MenuItem key={data.key} value={data.username}>{data.username}</MenuItem>
                    )
                }
              </Select>
            </FormControl> */}
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="select-multiple-checkbox-1">Pilih Pelajaran</InputLabel>
              <Select
                multiple
                value={mapelPilihan}
                onChange={this.handleChangePilihMapel}
                input={<Input id="select-multiple-checkbox-1" />}
                renderValue={selected => selected.join(', ')}
                MenuProps={MenuProps}
              >
                {mapel.map(data => (
                  <MenuItem key={data.key} value={data.value}>
                    <Checkbox checked={mapelPilihan.indexOf(data.value) > -1} />
                    <ListItemText primary={data.value} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* <FormControl className={classes.formControl}>
              <InputLabel htmlFor="drop-down-list-4">Pilih Pelajaran</InputLabel>                
              <Select
                open={openListMapel}
                onClose={() => this.setState({openListMapel:false})}
                onOpen={() => this.setState({openListMapel:true})}
                onChange={this.handleChange}
                value={mapelPilihan}
                inputProps={{
                  name: 'mapelPilihan',
                  id: 'drop-down-list-4',
                }}
              >
                <MenuItem value=""/>
                {
                    mapel.map(data => 
                        <MenuItem key={data.key} value={data.value}>{data.value}</MenuItem>
                    )
                }
              </Select>
            </FormControl> */}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} className={classes.cancelbutton} size='large' >
              Cancel
            </Button>
            <Button 
              onClick={() => this.props.tambahSesi(courseName,guruPilihan,siswaPilihan,kelasPilihan,mapelPilihan)}
              className={classes.okbutton} 
              variant='contained' 
              size='large'>
              Tambah
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

TambahSesi.propTypes = {
  classes: PropTypes.object.isRequired,
};
const TambahSesiWindow = withStyles(styles)(TambahSesi);
// //==================================redux======================================
const mapStateToProps = (state) => {
  return {
    guru: state.guru,
    siswa: state.siswa,
    kelas: state.kelas,
    mapel: state.mapel
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({queryGuru,queryKelas,queryMapel,querySiswa,tambahSesi},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(TambahSesiWindow);
