import classnames from "classnames/bind";
import PropTypes from "prop-types";
import { Labeled } from "../Labeled";
import styles from "./Select.module.css";

const cx = classnames.bind(styles);

/**
 * Select lets users choose one option from an options menu. Consider select when you have
 * 4 or more options, to avoid cluttering the interface.
 */
export const Select = ({
  disabled,
  error,
  helpText,
  label,
  labelHidden,
  onBlur,
  onChange,
  onFocus,
  options,
  required,
  success,
  value,
}) => {
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
    Select: true,
    disabled,
    "form-select": true,
  });

  const inputProps = {
    className,
    defaultValue: value,
    disabled,
    onBlur: handleBlur,
    onChange: handleChange,
    onFocus: handleFocus,
  };

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
      <select {...inputProps}>
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </Labeled>
  );
};

Select.propTypes = {
  ...Labeled.propTypes,
  /** Disable the input */
  disabled: PropTypes.bool,
  /** Callback when focus is removed */
  onBlur: PropTypes.func,
  /** Callback when value is changed */
  onChange: PropTypes.func,
  /** Callback when input is focused */
  onFocus: PropTypes.func,
  /** List of options or option groups to choose from */
  options: PropTypes.array,
  /** Initial value for the input */
  value: PropTypes.string,
};
