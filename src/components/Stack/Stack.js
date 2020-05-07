import classnames from "classnames/bind";
import PropTypes from "prop-types";
import { Children } from "react";
import { wrapWithComponent } from "../../utils/components";
import { Item } from "./components";
import styles from "./Stack.module.css";

const cx = classnames.bind(styles);

/**
 * Use to lay out a horizontal row of components or to achieve no-fuss vertical centering.
 * A stack is made of flexible items that wrap each of the stack’s children. Options
 * provide control of the wrapping, spacing, and relative size of the items in the stack.
 */
export const Stack = ({ children, distribution, spacing }) => {
  const className = cx("Stack", distribution);
  return (
    <div className={className}>
      {Children.map(children, wrapWithComponent(Item, { props: { spacing } }))}
    </div>
  );
};

Stack.propTypes = {
  /** Elements to display inside stack */
  children: PropTypes.node,
  /** Adjust horizontal alignment of elements */
  distribution: PropTypes.oneOf(["equalSpacing"]),
  /** Adjust spacing between elements */
  spacing: PropTypes.oneOf(["loose"]),
};

Stack.Item = Item;
