import PropTypes from "prop-types";
import styles from "./TextStyle.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

/**
 * Text style enhances text with additional visual meaning. For example, using subdued
 * text to de-emphasize it from its surrounding text.
 */
export const TextStyle = ({ children, variation }) => {
  const className = cx(variation);
  return <span className={className}>{children}</span>;
};

TextStyle.propTypes = {
  /** The content that should get the intended styling */
  children: PropTypes.node,
  /** Give text additional visual meaning */
  variation: PropTypes.oneOf(["subdued", "positive", "negative", "warning"]),
};
