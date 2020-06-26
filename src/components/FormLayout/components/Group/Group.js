import classnames from "classnames/bind";
import PropTypes from "prop-types";
import { Children } from "react";
import { wrapWithComponent } from "../../../../utils/components";
import styles from "../../FormLayout.module.css";
import { Item } from "../Item";

const cx = classnames.bind(styles);

/**
 * Use field groups to arrange multiple fields in a row.
 *
 * Works best for familiar layouts such as a row of city, state, and zip code fields. Use
 * caution when arranging unrelated fields next to each other as this makes fields easier
 * to miss.
 *
 * Field groups will wrap automatically on smaller screens.
 */
export const Group = ({ children }) => {
  const className = cx({
    Group: true,
  });
  return (
    <div className={className}>
      {Children.map(children, wrapWithComponent(Item))}
    </div>
  );
};

Group.propTypes = {
  /** The content to display inside the group. */
  children: PropTypes.node,
};

Group.displayName = "FormLayout.Group";
