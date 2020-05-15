import classnames from "classnames/bind";
import PropTypes from "prop-types";
import { UnstyledLink } from "../UnstyledLink";
import styles from "./Link.module.css";

const cx = classnames.bind(styles);

/**
 * Links take users to another place, and usually appear within or directly following a
 * sentence.
 *
 * For actions that aren't related to navigation, use the button component.
 */
export const Link = ({ children, external, monochrome, underlined, url }) => {
  const className = cx({
    Link: true,
    monochrome,
    underlined: underlined ?? monochrome,
  });

  return (
    <UnstyledLink className={className} external={external} href={url}>
      {children}
    </UnstyledLink>
  );
};

Link.propTypes = {
  /** The content to display inside the link */
  children: PropTypes.node,
  /** Makes the link open in a new tab */
  external: PropTypes.bool,
  /** Makes the link color the same as the current text color and adds an underline */
  monochrome: PropTypes.bool,
  /** Display an underline all the time */
  underlined: PropTypes.bool,
  /** The url to link to */
  url: PropTypes.string,
};
