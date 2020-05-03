import classNames from "classnames/bind";
import PropTypes from "prop-types";
import TextareaAutosize from "react-autosize-textarea";
import { Labeled } from "../Labeled";
import styles from "./TextField.module.css";

const cx = classNames.bind(styles);

/**
 * A text field is an input field that users can type into. It has a range of options and
 * supports several text formats including numbers.
 */
export const TextField = ({
  disabled,
  error,
  focused,
  helpText,
  label,
  multiline,
  onBlur,
  onChange,
  onFocus,
  required,
  success,
  type = "text",
  value,
}) => {
  // == LABEL ==
  const labelHidden = type === "search";

  // == CAPTION ==
  // The disabled state overrides any inflight error or success state to present a
  // pristine input.
  if (disabled) {
    error = null;
    success = null;
  }
  // == INPUT ==
  const handleFocus = () => {
    onFocus && onFocus();
  };
  const handleBlur = () => {
    onBlur && onBlur();
  };
  const handleChange = (event) => {
    onChange && onChange(event.currentTarget.value);
  };
  const className = cx({
    TextField: true,
    error,
    focused,
    "form-input": !multiline,
    "form-textarea": multiline,
    multiline,
  });

  const inputProps = {
    className: className,
    disabled: disabled,
    onBlur: handleBlur,
    onChange: handleChange,
    onFocus: handleFocus,
    placeholder: labelHidden ? label : undefined,
    type: type,
    value: value,
  };
  const inputMarkup = multiline ? (
    <TextareaAutosize
      {...inputProps}
      rows={typeof multiline === "number" ? multiline : 2}
    />
  ) : (
    <input {...inputProps} />
  );

  return (
    <Labeled
      className={styles.Label}
      error={error}
      helpText={helpText}
      hidden={labelHidden}
      label={label}
      required={required}
      success={success}
    >
      {inputMarkup}
    </Labeled>
  );
};

TextField.propTypes = {
  ...Labeled.propTypes,
  /** Disable the input */
  disabled: PropTypes.bool,
  /** Forces the focused state of the input */
  focused: PropTypes.bool,
  /** Allow for multiple lines of input */
  multiline: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  /** Callback when focus is removed */
  onBlur: PropTypes.func,
  /** Callback when value is changed */
  onChange: PropTypes.func,
  /** Callback when input is focused */
  onFocus: PropTypes.func,
  /** Determines the type of input */
  type: PropTypes.oneOf(["text", "search"]),
  /** Initial value for the input */
  value: PropTypes.string,
};
