import { useFocus } from "@react-aria/interactions";
import { useListBox, useOption } from "@react-aria/listbox";
import { mergeProps } from "@react-aria/utils";
import { Item } from "@react-stately/collections";
import { useListState } from "@react-stately/list";
import classnames from "classnames/bind";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import styles from "./OptionList.module.css";

const cx = classnames.bind(styles);

/**
 * FIXME: Description of OptionList
 */
export const OptionList = ({
  allowMultiple,
  onChange,
  options,
  selected,
  title,
}) => {
  // set up state using list created above + options to manage selection like disabled
  // items, single or multiple selection, and the callback when selection did change
  const state = useListState({
    /* eslint-disable react/display-name */
    children: (item) => (
      <Item aria-label={item.label} key={item.value}>
        {item.label}
      </Item>
    ),
    disabledKeys: options
      .filter((option) => option.disabled)
      .map((option) => option.value),
    disallowEmptySelection: true,
    items: options,
    onSelectionChange: onChange,
    selectedKeys: selected,
    selectionMode: allowMultiple ? "multiple" : "single",
  });

  // ref to the main dom element
  const ref = useRef();

  // actually start getting the props to build out our listbox
  // the interesting props like items, selectedKeys should now all be in state, so we
  // don't really need to pass those as props. the only remaining props you can define
  // control the behavior of the listbox itself, like should the focus wrap, isLoading,
  // loadMore for lazy loading
  const { listBoxProps } = useListBox({ label: title }, state, ref);

  const className = cx({
    OptionList: true,
  });

  return (
    <ul {...listBoxProps} className={className} ref={ref}>
      {[...state.collection].map((item) => (
        <Option item={item} key={item.key} state={state} />
      ))}
    </ul>
  );
};

function Option({ item, state }) {
  const ref = useRef();

  const isDisabled = state.disabledKeys.has(item.key);
  const isSelected = state.selectionManager.isSelected(item.key);

  const { optionProps } = useOption(
    {
      "aria-label": item["aria-label"],
      isDisabled,
      key: item.key,
      shouldFocusOnHover: true,
      shouldSelectOnPressUp: true,
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
}

OptionList.propTypes = {
  /** Allow more than one option to be selected */
  allowMultiple: PropTypes.bool,
  /** Callback when selection is changed */
  onChange: PropTypes.func.isRequired,
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
  /** The selected options */
  selected: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  /** The title of the list */
  title: PropTypes.string.isRequired,
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
