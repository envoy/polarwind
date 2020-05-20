import classnames from "classnames/bind";
import PropTypes from "prop-types";
import { Linkable } from "../../../Linkable";
import styles from "./Tab.module.css";

const cx = classnames.bind(styles);

/**
 * The actual tab itself
 */
export const Tab = ({ children, onClick, selected, url }) => {
  const className = cx({
    Tab: true,
    selected,
  });

  return (
    <li className={className}>
      <Linkable url={url} onClick={onClick}>
        <span>{children}</span>
      </Linkable>
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
  /** A destination to link to */
  url: PropTypes.string,
};
