import PropTypes from "prop-types";

/**
 * App provider is a required component that enables sharing global settings throughout the hierarchy of your application.
 */
export const AppProvider = ({ children }) => {
  return children;
};

AppProvider.propTypes = {
  /** Inner content of the application */
  children: PropTypes.node,
};
