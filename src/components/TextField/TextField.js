import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./TextField.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

/**
 * A text field is an input field that users can type into. It has a range of options and
 * supports several text formats including numbers.
 */
export const TextField = ({ error, type = "text" }) => {
  const [focus, setFocus] = useState(false);
  const onFocus = () => {
    setFocus(true);
  };
  const onBlur = () => {
    setFocus(false);
  };

  const className = cx({
    TextField: true,
    error: error && error.length > 1,
    focus,
  });

  return (
    <div className={className}>
      <input type={type} onFocus={onFocus} onBlur={onBlur}></input>
    </div>
  );
};

TextField.propTypes = {
  /** Error to display beneath the label */
  error: PropTypes.string,
  /** Determines the type of input */
  type: PropTypes.oneOf(["text"]),
};
