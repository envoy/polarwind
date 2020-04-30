import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Label } from "../Label";
import styles from "./Checkbox.module.css";
import classnames from "classnames/bind";

const cx = classnames.bind(styles);

/**
 * Use in forms to toggle the state of something on or off. Default checkboxes can appear
 * in two states: selected and disabled, or unselected.
 */
export const Checkbox = ({ checked, label, onChange }) => {
  const handleOnChange = (event) => {
    onChange && onChange(event.currentTarget.checked);
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
    <Label label={label} className={styles.Label}>
      <input
        type="checkbox"
        className={className}
        onChange={handleOnChange}
        ref={ref}
      />
    </Label>
  );
};

Checkbox.propTypes = {
  /** Checkbox is selected. `indeterminate` shows a horizontal line in the checkbox */
  checked: PropTypes.oneOf([true, false, "indeterminate"]),
  /** Label for the checkbox */
  label: PropTypes.node.isRequired,
  /** Callback when checkbox is toggled */
  onChange: PropTypes.func,
};
