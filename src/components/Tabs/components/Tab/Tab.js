import classnames from "classnames/bind";
import PropTypes from "prop-types";
import { UnstyledLink } from "../../../UnstyledLink";
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

  const tabMarkup = url ? (
    <UnstyledLink url={url} onClick={onClick}>
      <span>{children}</span>
    </UnstyledLink>
  ) : (
    <button onClick={onClick}>
      <span>{children}</span>
    </button>
  );

  return <li className={className}>{tabMarkup}</li>;
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
