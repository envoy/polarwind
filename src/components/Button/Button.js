import PropTypes from "prop-types";
import styles from "./Button.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

/**
 * Buttons are used primarily for actions, such as "Add", "Close", "Cancel", or "Save".
 */
export const Button = ({
  children,
  className,
  disabled,
  icon,
  outline,
  plain,
  size = "medium",
}) => {
  let iconMarkup;
  if (icon && size !== "large") {
    const Icon = icon;
    iconMarkup = (
      <span className={styles.Icon}>
        <Icon />
      </span>
    );
  }

  className = cx(
    {
      Button: true,
      disabled,
      outline,
      plain,
    },
    size != "medium" && size,
    className
  );

  return (
    <button className={className} disabled={disabled}>
      {iconMarkup}
      <span>{children}</span>
    </button>
  );
};

Button.propTypes = {
  /** The content to display inside the button */
  children: PropTypes.string,
  /** Any additional classes to add to the button */
  className: PropTypes.string,
  /** Disables the button, disallowing interaction */
  disabled: PropTypes.bool,
  /** Icon to display to the left of the button content */
  icon: PropTypes.func,
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
