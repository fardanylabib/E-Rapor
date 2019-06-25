import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

const styles = theme => ({
  button: {
    display: 'block',
    marginTop: theme.spacing.unit * 2,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

class DropdownList extends React.Component {
  state = {
    selected: '',
    open: false,
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const { classes,title,values} = this.props;
    console.log('selected status = '+this.state.selected);
    return (
      <form autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="drop-down-list">{title}</InputLabel>
          <Select
            open={this.state.open}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            value={this.state.selected}
            onChange={this.handleChange}
            inputProps={{
              name: 'selected',
              id: 'drop-down-list',
            }}
          >
            <MenuItem value=""/>
            {
                values.map(data => 
                    <MenuItem key={data.key} value={data.value}>{data.value}</MenuItem>
                )
            }
          </Select>
        </FormControl>
      </form>
    );
  }
}

DropdownList.propTypes = {
  classes: PropTypes.object.isRequired,
};

//redux
const DropdownListMenu = withStyles(styles)(DropdownList);

const mapStateToProps = (state) => {
  return {
    selectionList: state.selectionList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(setState,dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(DropdownListMenu);
