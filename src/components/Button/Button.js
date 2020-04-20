import PropTypes from "prop-types";
import styles from "./Button.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

/**
 * Buttons are used primarily for actions, such as "Add", "Close", "Cancel", or "Save".
 * Plain buttons are used for less important or less commonly used actions, such as "view
 * settings".
 */
export const Button = ({
  children,
  disabled,
  plain,
  outline,
  size = "medium",
}) => {
  const className = cx({
    Button: true,
    slim: size === "slim",
    large: size === "large",
    disabled,
    outline,
    plain,
  });

  return (
    <button className={className} disabled={disabled}>
      {children}
    </button>
  );
};

Button.propTypes = {
  /** The content to display inside the button */
  children: PropTypes.string,
  /** Disables the button, disallowing interaction */
  disabled: PropTypes.bool,
  /** Similar to outline but without a border, appropriate for tertiary actions */
  plain: PropTypes.bool,
  /**
   * Gives the button a subtle alternative to the default button styling, appropriate for
   * secondary actions
   */
  outline: PropTypes.bool,
  /** Changes the size of the button, giving it more or less padding */
  size: PropTypes.oneOf(["slim", "medium", "large"]),
};
