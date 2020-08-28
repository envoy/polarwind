import { FocusScope } from "@react-aria/focus";
import { useListBox } from "@react-aria/listbox";
import { DismissButton, useOverlay } from "@react-aria/overlays";
import { mergeProps } from "@react-aria/utils";
import classnames from "classnames/bind";
import PropTypes from "prop-types";
import { useRef } from "react";
import styles from "../../Select.module.css";
import { Option } from "../Option";

const cx = classnames.bind(styles);

/**
 * Implements the option menu when the select is opened
 */
export const OptionList = ({ state, ...otherProps }) => {
  const ref = useRef();

  // useListBox has most of the data it needs already in state, so we don't have to repeat
  // ourselves in the first argument. that argument will be more more controlling the
  // behavior of the listbox itself, like should the focus wrap, isLoading,
  // loadMore for lazy loading.
  const { listBoxProps } = useListBox(
    {
      "aria-labelledby": otherProps["aria-labelledby"],
      autoFocus: true,
      disallowEmptySelection: true,
    },
    state,
    ref
  );

  const overlayRef = useRef();
  const { overlayProps } = useOverlay(
    {
      isDismissable: true,
      isOpen: state.isOpen,
      onClose: state.close,
      shouldCloseOnBlur: true,
    },
    overlayRef
  );

  const className = cx({ OptionList: true });

  return (
    <FocusScope restoreFocus>
      <div {...overlayProps} ref={overlayRef}>
        <DismissButton onDismiss={state.close} />
        <ul
          {...mergeProps(listBoxProps, otherProps)}
          className={className}
          ref={ref}
        >
          {[...state.collection].map((item) => (
            <Option item={item} key={item.key} state={state} />
          ))}
        </ul>
        <DismissButton onDismiss={state.close} />
      </div>
    </FocusScope>
  );
};

OptionList.propTypes = {
  state: PropTypes.object,
};

OptionList.displayName = "Select.OptionList";
