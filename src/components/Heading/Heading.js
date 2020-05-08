import classnames from "classnames/bind";
import PropTypes from "prop-types";
import { createElement } from "react";
import styles from "./Heading.module.css";

const cx = classnames.bind(styles);

/**
 * Headings are used as the titles of each major section of a page in the interface. For
 * example, card components generally use headings as their title.
 */
export const Heading = ({ children, element = "h2" }) => {
  const className = cx("Heading");
  return createElement(element, { className }, <span>{children}</span>);
};

Heading.propTypes = {
  /** The content to display inside the heading */
  children: PropTypes.node,
  /** Name of the element to use for text */
  element: PropTypes.oneOf(["h1", "h2", "h3", "h4", "h5", "h6", "p"]),
};
