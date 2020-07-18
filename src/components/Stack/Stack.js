import classnames from "classnames/bind";
import PropTypes from "prop-types";
import { Children } from "react";
import { wrapWithComponent } from "../../utils/components";
import { Item } from "./components";
import styles from "./Stack.module.css";

const cx = classnames.bind(styles);
const bind = (variable) => (value) => variable === value;

/**
 * Use to lay out a horizontal row of components or to achieve no-fuss vertical centering.
 * A stack is made of flexible items that wrap each of the stack's children. Options
 * provide control of the wrapping, spacing, and relative size of the items in the stack.
 */
export const Stack = ({
  alignment,
  children,
  distribution,
  spacing,
  vertical,
  wrap,
}) => {
  const ax = bind(alignment);
  const dx = bind(distribution);
  const sx = bind(spacing);
  const className = cx({
    Stack: true,
    alignmentBaseline: ax("baseline"),
    alignmentCenter: ax("center"),
    alignmentFill: ax("fill"),
    alignmentLeading: ax("leading"),
    alignmentTrailing: ax("trailing"),
    distributionCenter: dx("center"),
    distributionEqualSpacing: dx("equalSpacing"),
    distributionEqualSpacingAround: dx("equalSpacingAround"),
    distributionFill: dx("fill"),
    distributionFillEvenly: dx("fillEvenly"),
    distributionLeading: dx("leading"),
    distributionTrailing: dx("trailing"),
    noWrap: !wrap,
    spacingLoose: sx("loose"),
    spacingNone: sx("none"),
    vertical,
  });
  return (
    <div className={className}>
      {Children.map(children, wrapWithComponent(Item))}
    </div>
  );
};

Stack.defaultProps = {
  wrap: true,
};

Stack.propTypes = {
  /** Adjust vertical alignment of elements */
  alignment: PropTypes.oneOf([
    "leading",
    "trailing",
    "center",
    "fill",
    "baseline",
  ]),
  /** Elements to display inside stack */
  children: PropTypes.node,
  /** Adjust horizontal alignment of elements */
  distribution: PropTypes.oneOf([
    "equalSpacing",
    "equalSpacingAround",
    "leading",
    "trailing",
    "center",
    "fill",
    "fillEvenly",
  ]),
  /** Adjust spacing between elements */
  spacing: PropTypes.oneOf(["loose", "none"]),
  /** Stack the elements vertically */
  vertical: PropTypes.bool,
  /** Wrap stack elements to additional rows as needed on small screens */
  wrap: PropTypes.bool,
};

Stack.Item = Item;
