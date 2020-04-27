import PropTypes from "prop-types";
import styles from "./Caption.module.css";

/**
 * Caption text size is smaller than the recommended size for general reading. It should
 * be used only in an text field help text, a graph label or as a timestamp for a list
 * item.
 */
export const Caption = ({ children }) => {
  return <p className={styles.Caption}>{children}</p>;
};

Caption.propTypes = {
  /** The content to use as a text field help text, graph label or timestamp */
  children: PropTypes.node,
};
