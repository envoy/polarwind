import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { Caption } from "../Caption";
import { Label } from "../Label";
import { TextStyle } from "../TextStyle";
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
  const helpTextMarkup = helpText && (
    <TextStyle variation="subdued">{helpText}</TextStyle>
  );
  const successMarkup = success && (
    <TextStyle variation="positive">{success}</TextStyle>
  );
  const errorMarkup = error && (
    <TextStyle variation="warning">{error}</TextStyle>
  );
  const hasCaption = errorMarkup || successMarkup || helpTextMarkup;
  const captionMarkup = hasCaption && <Caption>{hasCaption}</Caption>;

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
    hasCaption,
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
    <textarea
      {...inputProps}
      rows={typeof multiline === "boolean" ? 2 : multiline}
    />
  ) : (
    <input {...inputProps} />
  );

  return (
    <Label
      className={styles.Label}
      hidden={labelHidden}
      label={label}
      required={required}
    >
      {inputMarkup}
      {captionMarkup}
    </Label>
  );
};

TextField.propTypes = {
  /** Disable the input */
  disabled: PropTypes.bool,
  /** Error to display beneath the label */
  error: PropTypes.string,
  /** Forces the focused state of the input */
  focused: PropTypes.bool,
  /** Additional hint text to display */
  helpText: PropTypes.string,
  /** Label for the input */
  label: PropTypes.string.isRequired,
  /** Allow for multiple lines of input */
  multiline: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  /** Callback when focus is removed */
  onBlur: PropTypes.func,
  /** Callback when value is changed */
  onChange: PropTypes.func,
  /** Callback when input is focused */
  onFocus: PropTypes.func,
  /** Mark the field as required */
  required: PropTypes.bool,
  /** Success message to display beneath the label */
  success: PropTypes.string,
  /** Determines the type of input */
  type: PropTypes.oneOf(["text", "search"]),
  /** Initial value for the input */
  value: PropTypes.string,
};
