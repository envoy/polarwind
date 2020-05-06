import classnames from "classnames/bind";
import PropTypes from "prop-types";
import { Children } from "react";
import { wrapWithComponent } from "../../utils/components";
import styles from "./ButtonGroup.module.css";
import { Item } from "./components";

const cx = classnames.bind(styles);

/**
 * Button group displays multiple related actions stacked or in a horizontal row to help
 * with arrangement and spacing.
 */
export const ButtonGroup = ({ children }) => {
  const className = cx({
    ButtonGroup: true,
  });
  return (
    <div className={className}>
      {Children.map(children, wrapWithComponent(Item))}
    </div>
  );
};

ButtonGroup.propTypes = {
  /** Button components */
  children: PropTypes.node,
};

ButtonGroup.Item = Item;
