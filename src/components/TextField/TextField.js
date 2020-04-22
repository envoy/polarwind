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
export const TextField = ({
  error,
  helpText,
  label,
  success,
  required,
  type = "text",
}) => {
  const [focus, setFocus] = useState(false);
  const onFocus = () => {
    setFocus(true);
  };
  const onBlur = () => {
    setFocus(false);
  };

  const labelMarkup = (id) => <label htmlFor={id}>{label}</label>;

  const helpTextMarkup = helpText && <p>{helpText}</p>;
  const successMarkup = success && <p>{success}</p>;
  const errorMarkup = error && <p>{error}</p>;

  const isError = error && error.length > 1;

  const className = cx({
    TextField: true,
    error: isError,
    focus,
    required,
    success: !isError && success && success.length > 1,
  });

  return (
    <UIDConsumer>
      {(id) => (
        <div className={className}>
          {labelMarkup(id)}
          <div className="input-shadow">
            <input type={type} id={id} onFocus={onFocus} onBlur={onBlur} />
          </div>
          {errorMarkup || successMarkup || helpTextMarkup}
        </div>
      )}
    </UIDConsumer>
  );
};

TextField.propTypes = {
  /** Error to display beneath the label */
  error: PropTypes.string,
  /** Additional hint text to display */
  helpText: PropTypes.string,
  /** Label for the input */
  label: PropTypes.string.isRequired,
  /** Mark the field as required */
  required: PropTypes.bool,
  /** Success message to display beneath the label */
  success: PropTypes.string,
  /** Determines the type of input */
  type: PropTypes.oneOf(["text"]),
};
