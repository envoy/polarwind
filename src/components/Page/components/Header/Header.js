import classnames from "classnames/bind";
import PropTypes from "prop-types";
import { Stack } from "../../../Stack";
import styles from "../../Page.module.css";

const cx = classnames.bind(styles);

/**
 * The header of a page. This is a container of several things like the title and its
 * actions, and tabs
 */
export const Header = ({ children }) => {
  const className = cx({
    Header: true,
  });
  return (
    <div className={className}>
      <Stack spacing="loose" vertical>
        {children}
      </Stack>
    </div>
  );
};

Header.propTypes = {
  /** The title and tabs component */
  children: PropTypes.node,
};

Header.displayName = "Page.Header";
