import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./TextField.module.css";
import classNames from "classnames/bind";
import { UIDConsumer } from "react-uid";

const cx = classNames.bind(styles);

/**
 * A text field is an input field that users can type into. It has a range of options and
 * supports several text formats including numbers.
 */
export const TextField = ({ error, label, type = "text" }) => {
  const [focus, setFocus] = useState(false);
  const onFocus = () => {
    setFocus(true);
  };
  const onBlur = () => {
    setFocus(false);
  };

  const errorMarkup = error && <p>{error}</p>;

  const className = cx({
    TextField: true,
    error: error && error.length > 1,
    focus,
  });

  return (
    <UIDConsumer>
      {(id) => (
        <div className={className}>
          {label && <label htmlFor={id}>{label}</label>}
          <div className="input-shadow">
            <input type={type} id={id} onFocus={onFocus} onBlur={onBlur} />
          </div>
          {errorMarkup}
        </div>
      )}
    </UIDConsumer>
  );
};

TextField.propTypes = {
  /** Error to display beneath the label */
  error: PropTypes.string,
  /** Label for the input */
  label: PropTypes.string,
  /** Determines the type of input */
  type: PropTypes.oneOf(["text"]),
};
