import classnames from "classnames/bind";
import PropTypes from "prop-types";
import styles from "./Tab.module.css";

const cx = classnames.bind(styles);

/**
 * The actual tab itself
 */
export const Tab = ({ children, onClick, selected }) => {
  const className = cx({
    Tab: true,
    selected,
  });
  return (
    <li className={className}>
      <button onClick={onClick}>
        <span>{children}</span>
      </button>
    </li>
  );
};

Tab.propTypes = {
  /** The content of the tab */
  children: PropTypes.node,
  /** Callback when tab is clicked */
  onClick: PropTypes.func,
  /** Set tab to selected */
  selected: PropTypes.bool,
};
