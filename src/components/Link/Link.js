import classnames from "classnames/bind";
import PropTypes from "prop-types";
import styles from "./Link.module.css";

const cx = classnames.bind(styles);

/**
 * Links take users to another place, and usually appear within or directly following a
 * sentence.
 *
 * For actions that aren't related to navigation, use the button component.
 */
export const Link = ({ children, monochrome, underlined, url }) => {
  const className = cx({
    Link: true,
    monochrome,
    underlined: typeof underlined === "undefined" ? monochrome : underlined,
  });
  return (
    <a className={className} href={url}>
      {children}
    </a>
  );
};

Link.propTypes = {
  /** The content to display inside the link */
  children: PropTypes.node,
  /** Makes the link color the same as the current text color and adds an underline */
  monochrome: PropTypes.bool,
  /** Display an underline all the time */
  underlined: PropTypes.bool,
  /** The url to link to */
  url: PropTypes.string,
};
