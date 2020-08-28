import { useListBox } from "@react-aria/listbox";
import { Item } from "@react-stately/collections";
import { useListState } from "@react-stately/list";
import classnames from "classnames/bind";
import PropTypes from "prop-types";
import { useRef } from "react";
import { Option } from "./components";
import styles from "./OptionList.module.css";

const cx = classnames.bind(styles);

/**
 * The option list component lets you create a list of items that users can pick from.
 * This can include single selection or multiple selection of options. Option list usually
 * appears in a popover, and sometimes in a modal or a sidebar. Option lists are styled
 * differently than choice lists and should not be used within a form, but as a standalone menu.
 */
export const OptionList = ({
  allowMultiple,
  onChange,
  options,
  selected,
  title,
}) => {
  // NOTE: for single select, `disallowEmptySelection: true` prevents the user from
  // unselecting the current selected item by clicking it. this is an impossible
  // interaction in select dropdowns for example. It has no effect in multiple
  // selection mode.
  const state = useListState({
    /* eslint-disable react/display-name */
    children: (item) => (
      <Item aria-label={item.label} key={item.value}>
        {item.label}
      </Item>
    ),
    /* eslint-enable */
    disabledKeys: options
      .filter((option) => option.disabled)
      .map((option) => option.value),
    disallowEmptySelection: true,
    items: options,
    onSelectionChange: onChange,
    selectedKeys: selected,
    selectionMode: allowMultiple ? "multiple" : "single",
  });

  const ref = useRef();

  // useListBox has most of the data it needs already in state, so we don't have to repeat
  // ourselves in the first argument. that argument will be more more controlling the
  // behavior of the listbox itself, like should the focus wrap, isLoading,
  // loadMore for lazy loading.
  const { listBoxProps } = useListBox({ "aria-label": title }, state, ref);

  const className = cx({ OptionList: true });

  return (
    <ul {...listBoxProps} className={className} ref={ref}>
      {[...state.collection].map((item) => (
        <Option item={item} key={item.key} state={state} />
      ))}
    </ul>
  );
};

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

OptionList.Option = Option;
