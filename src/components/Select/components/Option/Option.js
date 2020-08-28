import { useFocus } from "@react-aria/interactions";
import { useOption } from "@react-aria/listbox";
import { mergeProps } from "@react-aria/utils";
import classnames from "classnames/bind";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import styles from "../../Select.module.css";

const cx = classnames.bind(styles);

/**
 * The option itself
 */
export const Option = ({ item, state }) => {
  const ref = useRef();

  const isDisabled = state.disabledKeys.has(item.key);
  const isSelected = state.selectionManager.isSelected(item.key);

  const { optionProps } = useOption(
    {
      "aria-label": item["aria-label"],
      isDisabled,
      key: item.key,
      shouldFocusOnHover: true,
      shouldSelectOnPressUp: false,
    },
    state,
    ref
  );

  const [focused, setFocused] = useState(false);
  const { focusProps } = useFocus({ onFocusChange: setFocused });

  const optionClassName = cx({
    Option: true,
    disabled: isDisabled,
    focused,
    selectable: !isDisabled,
    selected: isSelected,
  });

  return (
    <li
      {...mergeProps(optionProps, focusProps)}
      className={optionClassName}
      ref={ref}
    >
      {item.rendered}
    </li>
  );
};

Option.propTypes = {
  item: PropTypes.shape({
    "aria-label": PropTypes.string,
    key: PropTypes.string.isRequired,
    rendered: PropTypes.string,
  }),
  state: PropTypes.shape({
    disabledKeys: PropTypes.objectOf(PropTypes.string),
    selectionManager: PropTypes.shape({
      isSelected: PropTypes.func,
    }),
  }),
};

Option.displayName = "Select.Option";
