import { useButton } from "@react-aria/button";
import { HiddenSelect, useSelect } from "@react-aria/select";
import { Item } from "@react-stately/collections";
import { useSelectState } from "@react-stately/select";
import classnames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { Labeled } from "../Labeled";
import { Option, OptionList } from "./components";
import styles from "./Select.module.css";

const cx = classnames.bind(styles);

// TODO fix the falsy selectedItem
// TODO implement sections

/**
 * Select lets users choose one option from an options menu. Consider select when you have
 * 4 or more options, to avoid cluttering the interface.
 */
const Select = ({
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
  const handleChange = (value) => {
    onChange && onChange(value);
  };

  const ref = useRef();

  const items = options.map((option) => {
    if (typeof option === "string") {
      return { key: option, label: option };
    } else {
      return { key: option.value, label: option.label };
    }
  });

  const state = useSelectState({
    /* eslint-disable react/display-name */
    children: (item) => <Item aria-label={item.label}>{item.label}</Item>,
    /* eslint-enable */
    disabledKeys: options
      .filter((option) => option.disabled)
      .map((option) => option.value),
    isDisabled: disabled,
    items,
    onSelectionChange: handleChange,
    selectedKey: value,
  });

  // TODO support sections
  const { menuProps, triggerProps, valueProps } = useSelect(
    { label },
    state,
    ref
  );

  const { buttonProps } = useButton(
    { isDisabled: disabled, ...triggerProps },
    ref
  );
  buttonProps.onKeyDownCapture = triggerProps.onKeyDownCapture;

  // Emulate browser selection heuristics when a controlled value is not set, or an
  // uncontrolled selection is not set via a selected attribute on one of the options
  useEffect(() => {
    if (!state.selectedItem) {
      const firstKey = state.collection.getFirstKey();
      if (firstKey !== null) {
        state.setSelectedKey(firstKey);
      }
    }
  }, [state]);

  // useSelectState isFocused is only true when the activator has focus. when the menu is
  // opened, isFocused is false, but isOpen then becomes true. for onFocus and onBlur to
  // have the same semantics as a regular select onFocus/onBlur, we need to consider both
  // properties
  const isFocused = state.isFocused || state.isOpen;
  useEffect(() => {
    if (isFocused) {
      onFocus && onFocus();
    } else {
      onBlur && onBlur();
    }
  }, [isFocused, onFocus, onBlur]);

  const className = cx({
    Select: true,
    disabled,
    error,
    "form-select": true,
    triggerFocused: isFocused,
  });

  const triggerMarkup = (
    <button {...buttonProps} className={className} ref={ref}>
      <span {...valueProps}>{state.selectedItem?.rendered}</span>
    </button>
  );

  const optionsMarkup = state.isOpen && (
    <OptionList {...menuProps} state={state} triggerRef={ref} />
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
      <HiddenSelect
        isDisabled={disabled}
        label={label}
        name={label}
        state={state}
        triggerRef={ref}
      />
      {triggerMarkup}
      {optionsMarkup}
    </Labeled>
  );
};

Select.propTypes = {
  /** Disable the input */
  disabled: PropTypes.bool,
  /** Error to display beneath the label */
  error: PropTypes.string,
  /** Additional hint text to display */
  helpText: PropTypes.node,
  /** Label for the input */
  label: PropTypes.string.isRequired,
  /** Visually hide the label */
  labelHidden: PropTypes.bool,
  /** Callback when focus is removed */
  onBlur: PropTypes.func,
  /** Callback when value is changed */
  onChange: PropTypes.func,
  /** Callback when input is focused */
  onFocus: PropTypes.func,
  /** List of options or option groups to choose from */
  options: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(
      PropTypes.shape({
        disabled: PropTypes.bool,
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      })
    ),
    PropTypes.arrayOf(
      PropTypes.shape({
        options: PropTypes.oneOfType([
          PropTypes.arrayOf(PropTypes.string),
          PropTypes.arrayOf(
            PropTypes.shape({
              disabled: PropTypes.bool,
              label: PropTypes.string.isRequired,
              value: PropTypes.string.isRequired,
            })
          ),
        ]).isRequired,
        title: PropTypes.string.isRequired,
      })
    ),
  ]),
  /** Mark the field as required */
  required: PropTypes.bool,
  /** Success message to display beneath the label */
  success: PropTypes.string,
  /** Initial value for the input */
  value: PropTypes.string,
};

export { Select };

Select.OptionList = OptionList;
Select.Option = Option;
