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
  placeholder,
  required,
  success,
  value,
}) => {
  const className = cx({
    Select: true,
    "form-select": true,
  });

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
      <select className={className}>
        {options.map(({ label, value }) => (
          <option key={value}>{label}</option>
        ))}
      </select>
    </Labeled>
  );
};

Select.propTypes = {
  ...Labeled.propTypes,
  /** List of options or option groups to choose from */
  options: PropTypes.array,
};
