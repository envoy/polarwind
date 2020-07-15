import classnames from "classnames/bind";
import PropTypes from "prop-types";
import { Linkable } from "../Linkable/Linkable";
import styles from "./Link.module.css";

const cx = classnames.bind(styles);

/**
 * Links take users to another place, and usually appear within or directly following a
 * sentence.
 *
 * For actions that aren't related to navigation, use the button component.
 */
export const Link = ({
  children,
  download,
  external,
  monochrome,
  onClick,
  underlined,
  url,
}) => {
  const handleClick = () => {
    onClick && onClick();
  };

  const className = cx({
    Link: true,
    monochrome,
    underlined: underlined ?? monochrome,
  });

  return (
    <Linkable
      className={className}
      download={download}
      external={external}
      url={url}
      onClick={handleClick}
    >
      {children}
    </Linkable>
  );
};

Link.propTypes = {
  /** The content to display inside the link */
  children: PropTypes.node,
  /** Instructs the browser to download the file */
  download: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Makes the link open in a new tab */
  external: PropTypes.bool,
  /** Makes the link color the same as the current text color and adds an underline */
  monochrome: PropTypes.bool,
  /** Callback when a link is clicked */
  onClick: PropTypes.func,
  /** Display an underline all the time */
  underlined: PropTypes.bool,
  /** The url to link to */
  url: PropTypes.string,
};
