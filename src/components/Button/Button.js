import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { UnstyledLink } from "../UnstyledLink/UnstyledLink";
import styles from "./Button.module.css";

const cx = classNames.bind(styles);

/**
 * Buttons are used primarily for actions, such as "Add", "Close", "Cancel", or "Save".
 */
export const Button = ({
  children,
  className,
  disabled,
  icon,
  onClick,
  outline,
  brandOutline,
  plain,
  size = "medium",
  url,
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

  const content = (
    <>
      {iconMarkup}
      <span>{children}</span>
    </>
  );

  className = cx(
    {
      Button: true,
      disabled,
      outline,
      brandOutline,
      plain,
    },
    size != "medium" && size,
    className
  );

  return url ? (
    disabled ? (
      // Render an `<a>` so toggling disabled/enabled state changes only the `href`
      // attribute instead of replacing the whole element.
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <a className={className}>{content}</a>
    ) : (
      <UnstyledLink className={className} url={url} onClick={onClick}>
        {content}
      </UnstyledLink>
    )
  ) : (
    <button className={className} disabled={disabled} onClick={onClick}>
      {content}
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
  /** Callback when clicked */
  onClick: PropTypes.func,
  /**
   * Gives the button a subtle alternative to the default button styling, appropriate for
   * secondary actions
   */
  outline: PropTypes.bool,
  /**
   * Gives the button an outline alternative to the default button styling, appropriate for
   * secondary actions
   */
  brandOutline: PropTypes.bool,
  /** Similar to outline but without a border, appropriate for tertiary actions */
  plain: PropTypes.bool,
  /** Changes the size of the button, giving it more or less padding */
  size: PropTypes.oneOf(["slim", "medium", "large"]),
  /** A destination to link to, rendered in the href attribute of a link */
  url: PropTypes.string,
};
