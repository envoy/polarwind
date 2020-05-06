import classnames from "classnames/bind";
import PropTypes from "prop-types";
import styles from "./Stack.module.css";

const cx = classnames.bind(styles);

/**
 * Use to lay out a horizontal row of components or to achieve no-fuss vertical centering.
 * A stack is made of flexible items that wrap each of the stack’s children. Options
 * provide control of the wrapping, spacing, and relative size of the items in the stack.
 */
export const Stack = ({ children }) => {
  const className = cx({
    Stack: true,
  });
  return <div className={className}>{children}</div>;
};

Stack.propTypes = {
  /** Elements to display inside stack */
  children: PropTypes.node,
};
