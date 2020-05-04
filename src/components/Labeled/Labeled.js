import classnames from "classnames/bind";
import PropTypes from "prop-types";
import { Caption } from "../Caption";
import { Label } from "../Label";
import { TextStyle } from "../TextStyle";
import styles from "./Labeled.module.css";

const cx = classnames.bind(styles);

/**
 * A component that extracts the common form field pattern of having a Label, the form
 * field itself and finally help/error/success text.
 */
export const Labeled = ({
  children,
  className,
  error,
  helpText,
  hidden,
  label,
  required,
  success,
}) => {
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

  className = cx(className);

  return (
    <Label
      className={className}
      hidden={hidden}
      label={label}
      required={required}
    >
      {children}
      {captionMarkup}
    </Label>
  );
};

Labeled.propTypes = {
  /** The input to wrap */
  children: PropTypes.node,
  /** Any additional classes to add to the button */
  className: PropTypes.string,
  /** Error to display beneath the label */
  error: PropTypes.string,
  /** Additional hint text to display */
  helpText: PropTypes.node,
  /** Visually hide the label */
  hidden: PropTypes.bool,
  /** Label for the input */
  label: PropTypes.string.isRequired,
  /** Mark the field as required */
  required: PropTypes.bool,
  /** Success message to display beneath the label */
  success: PropTypes.string,
};
