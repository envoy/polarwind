import PropTypes from "prop-types";
import styles from "./Caption.module.css";

export const Caption = ({ children }) => {
  return <p className={styles.Caption}>{children}</p>;
};

Caption.propTypes = {
  children: PropTypes.node,
};
