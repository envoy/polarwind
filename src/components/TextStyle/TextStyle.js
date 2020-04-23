import PropTypes from "prop-types";
import styles from "./TextStyle.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export const TextStyle = ({ children, variation }) => {
  const className = cx(variation);
  return <span className={className}>{children}</span>;
};

TextStyle.propTypes = {
  children: PropTypes.node,
  variation: PropTypes.oneOf(["subdued", "positive", "negative", "warning"]),
};
