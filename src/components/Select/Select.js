import { useButton } from "@react-aria/button";
import { useFocus } from "@react-aria/interactions";
import { useListBox, useOption } from "@react-aria/listbox";
import { HiddenSelect, useSelect } from "@react-aria/select";
import { mergeProps } from "@react-aria/utils";
import { Item } from "@react-stately/collections";
import { useSelectState } from "@react-stately/select";
import classnames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { Labeled } from "../Labeled";
import styles from "./Select.module.css";

const cx = classnames.bind(styles);

const EMPTY_STRING_ALT = "__EMPTY_STRING__";

/* eslint-disable react/prop-types */
function Option({ item, state }) {
  const ref = useRef();
  const isDisabled = state.disabledKeys.has(item.key);
  const isSelected = state.selectionManager.isSelected(item.key);
  const { optionProps } = useOption(
    {
      isDisabled,
      isSelected,
      key: item.key,
      shouldFocusOnHover: true,
      shouldSelectOnPressUp: true,
    },
    state,
    ref
  );
  const [, setFocused] = useState(false);
  const { focusProps } = useFocus({ onFocusChange: setFocused });

  // TODO style disabled item
  return (
    <li {...mergeProps(optionProps, focusProps)} ref={ref}>
      {item.rendered}
    </li>
  );
}
/* eslint-enable */

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
  // TODO attach onFocus and onBlur handlers
  const handleFocus = () => {
    onFocus && onFocus();
  };
  const handleBlur = () => {
    onBlur && onBlur();
  };
  const handleChange = (value) => {
    onChange && onChange(replaceAlternativeWithEmptyString(value));
  };

  const className = cx({
    Select: true,
    disabled,
    error,
    "form-select": true,
  });

  const ref = useRef();
  const props = {
    "aria-label": label,
    children: buildOptionsChildren(options),
    defaultSelectedKey: value,
    disabledKeys: buildDisabledKeys(options),
    isDisabled: disabled,
    onSelectionChange: handleChange,
  };
  const state = useSelectState(props);
  // TODO support sections
  const { menuProps, triggerProps, valueProps } = useSelect(props, state, ref);
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

  const activatorMarkup = (
    <button {...buttonProps} className={className} ref={ref}>
      <span {...valueProps}>{state.selectedItem?.rendered}</span>
    </button>
  );

  const optionsMarkup = state.isOpen && (
    <OptionList {...menuProps} label={label} state={state} />
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
        state={state}
        triggerRef={ref}
      />
      {activatorMarkup}
      {optionsMarkup}
    </Labeled>
  );
};

// Temporary workaround for a bug with react-aria/select when dealing with empty string
// keys https://github.com/adobe/react-spectrum/issues/1016
function replaceEmptyStringWithAlternative(str) {
  return str === "" ? EMPTY_STRING_ALT : str;
}

function replaceAlternativeWithEmptyString(str) {
  return str === EMPTY_STRING_ALT ? "" : str;
}

function buildDisabledKeys(options) {
  return options
    .filter((option) => option.disabled)
    .map((option) => option.value);
}

function buildOptionsChildren(options) {
  return options.map((option) =>
    typeof option === "string" ? (
      <Item key={replaceEmptyStringWithAlternative(option)}>{option}</Item>
    ) : (
      <Item key={replaceEmptyStringWithAlternative(option.value)}>
        {option.label}
      </Item>
    )
  );
}

/* eslint-disable react/prop-types */
function OptionList({ label, state, ...menuProps }) {
  const ref = useRef();
  const { listBoxProps } = useListBox(
    { autoFocus: state.focusStrategy, label },
    state,
    ref
  );

  return (
    <ul {...mergeProps(listBoxProps, menuProps)} ref={ref}>
      {[...state.collection].map((item) => (
        <Option item={item} key={item.key} state={state} />
      ))}
    </ul>
  );
}
/* eslint-enable */

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
