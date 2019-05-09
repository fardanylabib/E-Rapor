//functional
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withRouter, Route, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';

//material-ui components
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

//pages & components
import Dashboard from './pages/Dashboard';
import Profil from './pages/Profil';
import Perkembangan from './pages/Perkembangan';
import Pembayaran from './pages/Pembayaran';
import Login from './LogIn';
import Register from './Register';
import Messages from './Messages';

//images & icons
import AlmasLogo from '../media/logo-almastutoring.png';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import HomeIcon from '@material-ui/icons/Home';
import MoneyIcon from '@material-ui/icons/MonetizationOn';
import DownloadIcon from '@material-ui/icons/CloudDownload';

//========================================DRAWER=====================================================
const drawerWidth = 220;
const styles = theme => ({
  root: {
    display: 'flex',
  },
  grow: {
    flexGrow: 0.96,
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: '#02C8A7',
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },

  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    background: '#7CDBD5',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    background: '#FAFAFA',
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

function ListItemLink(props) {
  return <ListItem component={Link} {...props} button/>;
}

class PersistentDrawerLeft extends React.Component {
  constructor(){
    super();
    this.state = {
      open: false,
    };
  }

  handleDrawerOpen = () => {
    if(this.props.isUser){
      this.setState({ open: true });
    }
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, theme,isUser,email} = this.props;
    let open;
    let registration;
    let AppbarTitle;
    if(!isUser){
      console.log("belum masuk");
      registration = <Register/>;
      open = false;
      AppbarTitle = 'Almas Tutoring';
    }else{
      console.log("masuk");
      registration = null;
      open = this.state.open;
      const name = email.split('@')[0];
      AppbarTitle = 'Hi, '+ name.substring(0,1).toUpperCase()+name.substring(1).toLowerCase()+ '!';
    }

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" align="left" noWrap className={classes.grow}>
              {AppbarTitle}
            </Typography>
            <Login />
            {registration}
          </Toolbar>
        </AppBar>
        <Messages />
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <a href="https://almastutoring.com"><img src={AlmasLogo} alt="HTML5 Icon" width="150"/></a>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          
            <List>
              <ListItemLink to='/'>
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary="Profil Saya" />
              </ListItemLink>
            
              <ListItemLink to='/dashboard'>
                <ListItemIcon><HowToRegIcon /></ListItemIcon>
                <ListItemText primary="Daftar Kelas" />
              </ListItemLink>
            
              <ListItemLink to='/perkembangan' >
                <ListItemIcon><TrendingUpIcon /></ListItemIcon>
                <ListItemText primary="Perkembangan Siswa" />
              </ListItemLink>
  
              <ListItemLink to='/pembayaran'>
                <ListItemIcon><MoneyIcon /></ListItemIcon>
                <ListItemText primary="Pembayaran Siswa" />
              </ListItemLink>
              <ListItem button>
                <ListItemIcon><DownloadIcon /></ListItemIcon>
                <ListItemText primary="Download" />
              </ListItem>
            </List>            
        </Drawer>
        
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <Switch>
            <Route exact path='/' component={Profil} />
            <Route path ='/dashboard' component={Dashboard} />
            <Route path ='/perkembangan' component={Perkembangan} />
            <Route path ='/pembayaran' component={Pembayaran} />
          </Switch>
          
        </main>
      </div>
    );
  }
}

PersistentDrawerLeft.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

//redux
const mapStateToProps = (state) => {
  return {
    isUser: state.isUser,
    email: state.email
  }
}

const PersistentDL = withStyles(styles, { withTheme: true })(PersistentDrawerLeft);
export default withRouter(connect(mapStateToProps)(PersistentDL));