import React from "react"
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { Typography, Toolbar } from '@material-ui/core';
import {PropTypes} from "prop-types";

const styles = {
  appbar: {
    position: 'relative',
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
}

const Appbar = (props) => {
  const {classes} = props;
  return (
    <div className={classes.appbar}>
      <AppBar postion="sticky">
        <Toolbar>
          <Typography variant="title"
            color="inherit" className={classes.flex}>
            Todo List
        </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

Appbar.propTypes = {
  classes: PropTypes.object.isRequired
}
export default withStyles(styles)(Appbar);