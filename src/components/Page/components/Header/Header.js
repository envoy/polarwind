import classnames from "classnames/bind";
import PropTypes from "prop-types";
import styles from "../../Page.module.css";

const cx = classnames.bind(styles);

/**
 * The header of a page. This is a container of several things potentially, like a back
 * button, input fields.
 */
export const Header = ({ action, children }) => {
  const className = cx({
    Header: true,
  });
  return (
    <div className={className}>
      <h1>{children}</h1>
      {action}
    </div>
  );
};

Header.propTypes = {
  /** Header action */
  action: PropTypes.node,
  /** The title */
  children: PropTypes.node,
};
