import classnames from "classnames/bind";
import PropTypes from "prop-types";
import styles from "./Toggle.module.css";
const cx = classnames.bind(styles);

const SPACEBAR = 32;

/**
 * Use to give users control over a feature or option that can be turned on or off.
 */
export const Toggle = ({ enabled, onClick }) => {
  const handleOnClick = () => onClick && onClick();
  const handleKeyDown = (event) => {
    if (event.keyCode === SPACEBAR) {
      event.preventDefault();
      handleOnClick();
    }
  };

  const className = cx({ Toggle: true, disabled: !enabled, enabled });

  return (
    <span
      aria-checked="false"
      className={className}
      role="checkbox"
      tabIndex="0"
      onClick={handleOnClick}
      onKeyDown={handleKeyDown}
    >
      <span aria-hidden="true" />
    </span>
  );
};

Toggle.propTypes = {
  /** Sets toggle state to enabled or disabled */
  enabled: PropTypes.bool,
  /** Callback when toggle is clicked */
  onClick: PropTypes.func,
};
