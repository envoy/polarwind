import classnames from "classnames/bind";
import PropTypes from "prop-types";
import { Label } from "../Label";
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
  value,
}) => {
  const className = cx({
    Select: true,
    "form-select": true,
  });

  return (
    <Label className={styles.Label} label={label}>
      <select className={className}>
        {options.map(({ label, value }) => (
          <option key={value}>{label}</option>
        ))}
      </select>
    </Label>
  );
};

Select.propTypes = {
  /** Label for the select */
  label: PropTypes.string.isRequired,
  /** List of options or option groups to choose from */
  options: PropTypes.array,
};
