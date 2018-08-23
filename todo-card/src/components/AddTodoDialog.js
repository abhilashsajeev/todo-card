import React, { Component } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from "@material-ui/core"
import { TextField, Button } from "@material-ui/core";
import { saveTodo } from "../actions/todoActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class AddTodoDialog extends Component {
  state = {
    value: ''
  }
  handleChange = (event) => {
    event.preventDefault();
    this.setState({ value: event.target.value });
  }
  handleSubmit = () => {
    this.props.saveTodo(this.state.value);
    this.props.handleClose();
  }
  render() {
    const props = this.props;
    return (
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Todo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To Add todo, please enter your todo content here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="todoContent"
            label="Todo content"
            type="text"
            fullWidth
            value={this.state.value}
            onChange={this.handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleSubmit} color="primary">
            Save todo
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

AddTodoDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  saveTodo: PropTypes.func.isRequired
};

export default connect(state => state, {
  saveTodo
})(AddTodoDialog);