import classnames from "classnames/bind";
import PropTypes from "prop-types";
import styles from "../../Stack.module.css";

const cx = classnames.bind(styles);

/**
 * Wrapper for each child under a Stack, mostly to give it spacing.
 */
export const Item = ({ children, spacing }) => {
  const className = cx("Item", spacing);
  return <div className={className}>{children}</div>;
};

Item.propTypes = {
  /** The child to wrap */
  children: PropTypes.node,
  /** Adjust spacing between elements */
  spacing: PropTypes.oneOf(["loose"]),
};

Item.displayName = "Stack.Item";
