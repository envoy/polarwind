import classnames from "classnames/bind";
import PropTypes from "prop-types";
import styles from "../../FormLayout.module.css";

const cx = classnames.bind(styles);

/**
 * Wrapper for each child under a FormLayout, mostly to give it spacing.
 */
export const Item = ({ children }) => {
  const className = cx("Item");
  return <div className={className}>{children}</div>;
};

Item.propTypes = {
  /** The child to wrap */
  children: PropTypes.node,
};

Item.displayName = "FormLayout.Item";
