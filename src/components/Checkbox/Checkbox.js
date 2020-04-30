import classnames from "classnames/bind";
import PropTypes from "prop-types";
import { useRef, useEffect } from "react";
import { Label } from "../Label";
import styles from "./Checkbox.module.css";

const cx = classnames.bind(styles);

/**
 * Use in forms to toggle the state of something on or off. Default checkboxes can appear
 * in two states: selected and disabled, or unselected.
 */
export const Checkbox = ({
  checked,
  disabled,
  label,
  onBlur,
  onChange,
  onFocus,
}) => {
  const handleOnChange = (event) => {
    onChange && onChange(event.currentTarget.checked);
  };

  const handleOnBlur = () => {
    onBlur && onBlur();
  };

  const handleOnFocus = () => {
    onFocus && onFocus();
  };

  const isIndeterminate = checked === "indeterminate";
  const isChecked = !isIndeterminate && Boolean(checked);

  const ref = useRef();
  useEffect(() => {
    ref.current.checked = isChecked;
    ref.current.indeterminate = isIndeterminate;
  }, [isIndeterminate, isChecked]);

  const className = cx("form-checkbox", "Checkbox");

  return (
    <Label className={styles.Label} label={label}>
      <input
        className={className}
        disabled={disabled}
        ref={ref}
        type="checkbox"
        onBlur={handleOnBlur}
        onChange={handleOnChange}
        onFocus={handleOnFocus}
      />
    </Label>
  );
};

Checkbox.propTypes = {
  /** Checkbox is selected. `indeterminate` shows a horizontal line in the checkbox */
  checked: PropTypes.oneOf([true, false, "indeterminate"]),
  /** Disable input */
  disabled: PropTypes.bool,
  /** Label for the checkbox */
  label: PropTypes.node.isRequired,
  /** Callback when focus is removed */
  onBlur: PropTypes.func,
  /** Callback when checkbox is toggled */
  onChange: PropTypes.func,
  /** Callback when checkbox is focused */
  onFocus: PropTypes.func,
};
