import classnames from "classnames/bind";
import PropTypes from "prop-types";
import { createElement } from "react";
import styles from "./DisplayText.module.css";

const cx = classnames.bind(styles);

/**
 * Display styles make a bold visual statement. Use them to create impact when the main
 * goal is visual storytelling. For example, use display text to convince or reassure
 * users such as in marketing content or to capture attention during onboarding.
 */
export const DisplayText = ({
  children,
  element = "p",
  secondary,
  size = "medium",
}) => {
  const className = cx({ secondary }, "DisplayText", size);
  return createElement(element, { className }, <span>{children}</span>);
};

DisplayText.propTypes = {
  /** Content to display */
  children: PropTypes.node,
  /** Name of the element to use for text */
  element: PropTypes.oneOf(["h1", "h2", "h3", "h4", "h5", "h6", "p"]),
  /** Subdued display text */
  secondary: PropTypes.bool,
  /** Size of the text */
  size: PropTypes.oneOf(["small", "medium", "large", "extraLarge"]),
};
