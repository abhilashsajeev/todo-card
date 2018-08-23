import React from 'react';
import { connect } from 'react-redux';
import { Snackbar } from '../../node_modules/@material-ui/core';
import Proptypes from 'prop-types'
export const Message = ({ message }) => (
  message ? <Snackbar open={true} autoHideDuration={4000}
    message={<span className="message" >{message}</span>} /> : null
);

Message.propTypes = {
  message: Proptypes.string
};

export default connect((state) => ({ message: state.message }))(Message);