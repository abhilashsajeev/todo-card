import React from "react";
import PropTypes from "prop-types";

const TabContainer = (props) => {
  return (
    <div style={{ padding: 8 * 3 }}>
      {props.children}
    </div>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TabContainer;