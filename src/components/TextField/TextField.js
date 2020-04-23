import { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { UIDConsumer } from "react-uid";
import styles from "./TextField.module.css";
import { Label } from "./components";
import { TextStyle } from "../TextStyle";
import { Caption } from "../Caption";

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
  success,
  required,
  type = "text",
  value,
}) => {
  const [focus, setFocus] = useState(focused || false);
  const onFocus = () => {
    setFocus(focused || true);
  };
  const onBlur = () => {
    setFocus(focused || false);
  };

  const labelHidden = type === "search";

  const labelMarkup = (id) => (
    <Label id={id} hidden={labelHidden} required={required}>
      {label}
    </Label>
  );

  // The disabled state overrides any inflight error or success state to present a
  // pristine input.
  if (disabled) {
    error = null;
    success = null;
  }

  const helpTextMarkup = helpText && (
    <Caption>
      <TextStyle variation="subdued">{helpText}</TextStyle>
    </Caption>
  );
  const successMarkup = success && (
    <Caption>
      <TextStyle variation="positive">{success}</TextStyle>
    </Caption>
  );
  const errorMarkup = error && (
    <Caption>
      <TextStyle variation="warning">{error}</TextStyle>
    </Caption>
  );
  const captionMarkup = errorMarkup || successMarkup || helpTextMarkup;

  const isError = error && error.length > 1;

  const className = cx({
    search: type === "search",
    error: isError,
  });

  const wrapperClassName = cx({
    wrapper: true,
    error,
    focus,
    hasCaption: captionMarkup,
    disabled,
  });

  return (
    <UIDConsumer>
      {(id) => (
        <div className={className}>
          {labelMarkup(id)}
          <div className={wrapperClassName}>
            <input
              type={type}
              id={id}
              onFocus={onFocus}
              onBlur={onBlur}
              placeholder={labelHidden ? label : undefined}
              value={value}
              disabled={disabled}
            />
          </div>
          {captionMarkup}
        </div>
      )}
    </UIDConsumer>
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
  /** Mark the field as required */
  required: PropTypes.bool,
  /** Success message to display beneath the label */
  success: PropTypes.string,
  /** Determines the type of input */
  type: PropTypes.oneOf(["text", "search"]),
  /** Initial value for the input */
  value: PropTypes.string,
};
