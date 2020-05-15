import classnames from "classnames/bind";
import PropTypes from "prop-types";
import { useContext } from "react";
import { OriginContext } from "../../utils/origin";
import { ParentContext } from "../../utils/parent";
import { StandaloneContext } from "../../utils/standalone";
import styles from "./Link.module.css";

const cx = classnames.bind(styles);

/**
 * Links take users to another place, and usually appear within or directly following a
 * sentence.
 *
 * For actions that aren't related to navigation, use the button component.
 */
export const Link = ({ children, external, monochrome, underlined, url }) => {
  const origin = useContext(OriginContext);
  const standalone = useContext(StandaloneContext);
  const parent = useContext(ParentContext);

  const handleClick = (e) => {
    if (!standalone && url?.startsWith(origin)) {
      e.preventDefault();
      parent.sendMessage({
        event: "navigate",
        url: e.currentTarget.href,
      });
    }
  };

  const target = external ? "_blank" : undefined;
  const rel = external ? "noopener noreferrer" : undefined;

  const className = cx({
    Link: true,
    monochrome,
    underlined: underlined ?? monochrome,
  });

  return (
    <a
      className={className}
      href={url}
      rel={rel}
      target={target}
      onClick={handleClick}
    >
      {children}
    </a>
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
