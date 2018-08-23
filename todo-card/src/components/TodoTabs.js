import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TaskContainer from './TaskContainer';
import AddTodoDialog from './AddTodoDialog';
import { Button } from '../../node_modules/@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import TabContainer from "../components/TabContainer";

const styles = theme => ({
  tabs: {
    flexGrow: 1,

    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  }
});

class TodoTabs extends React.Component {
  state = {
    value: 0,
    open: false
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.tabs}>
        <AddTodoDialog open={this.state.open}
          handleClose={this.handleClose}
        />
        <AppBar position="static">
          <Tabs centered value={value} onChange={this.handleChange}>
            <Tab label="Todo" />
            <Tab label="In Progress" />
            <Tab label="Complete" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer><TaskContainer type="todo" /></TabContainer>}
        {value === 1 && <TabContainer><TaskContainer type="inprogress" /></TabContainer>}
        {value === 2 && <TabContainer><TaskContainer type="complete" /></TabContainer>}

        <Button variant="fab" color="primary" title="Add todo"
          className={classes.fab} onClick={this.handleClickOpen}>
          <AddIcon />
        </Button>

      </div>
    );
  }
}

TodoTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TodoTabs);