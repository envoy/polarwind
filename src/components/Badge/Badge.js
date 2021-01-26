import classnames from "classnames/bind";
import PropTypes from "prop-types";
import styles from "./Badge.module.css";

const cx = classnames.bind(styles);

/**
 * Badges are used to inform users of the status of an object or of an action that's been
 * taken.
 */
export const Badge = ({ children, status }) => {
  const className = cx("Badge", status);
  return (
    <div className={className}>
      <span>{children}</span>
    </div>
  );
};

Badge.propTypes = {
  /** The content to display inside the badge */
  children: PropTypes.node,
  /** Set the color of the badge for the given status */
  status: PropTypes.oneOf(["info", "success", "error", "warning"]),
};
