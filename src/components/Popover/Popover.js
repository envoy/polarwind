import { FocusScope } from "@react-aria/focus";
import {
  DismissButton,
  OverlayContainer,
  useOverlay,
  useOverlayPosition,
} from "@react-aria/overlays";
import PropTypes from "prop-types";
import { useRef } from "react";

/**
 * Popovers are small overlays that open on demand. They form the building blocks for
 * Select options, menus, modals and slideovers.
 */
export const Popover = ({ active, children, onClose, triggerRef }) => {
  const ref = useRef();

  const { overlayProps } = useOverlay(
    {
      isDismissable: true,
      isOpen: active,
      onClose,
      shouldCloseOnBlur: true,
    },
    ref
  );

  const { overlayProps: positionProps } = useOverlayPosition({
    containerPadding: 0,
    isOpen: active,
    offset: 4,
    overlayRef: ref,
    placement: "bottom start",
    targetRef: triggerRef,
  });

  let style = positionProps.style;
  const activator = triggerRef.current;
  if (activator) {
    const { width } = activator.getBoundingClientRect();
    style = {
      ...style,
      minWidth: width,
    };
  }

  return (
    active && (
      <OverlayContainer>
        <FocusScope restoreFocus>
          <div {...overlayProps} ref={ref} style={style}>
            <DismissButton onDismiss={onClose} />
            {children}
            <DismissButton onDismiss={onClose} />
          </div>
        </FocusScope>
      </OverlayContainer>
    )
  );
};

Popover.propTypes = {
  /** Whether the overlay is currently open */
  active: PropTypes.bool.isRequired,
  /** The content to display inside the popover */
  children: PropTypes.node,
  /** Handler that is called when the overlay should close */
  onClose: PropTypes.func.isRequired,
  /** The ref of the trigger button */
  triggerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
};
