import PropTypes from "prop-types";
import { useContext } from "react";
import { OriginContext } from "../../utils/origin";
import { ParentContext } from "../../utils/parent";
import { StandaloneContext } from "../../utils/standalone";

/**
 * An internal component used by components that are link-like, like `Link` and `Button`.
 * It provides behaviors when dealing with internal and external links, and sending
 * navigation events to the parent if run in an embedded way.
 */
export const UnstyledLink = ({ children, external, url, ...rest }) => {
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

  return (
    <a href={url} rel={rel} target={target} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
};

UnstyledLink.propTypes = {
  /** The content to display inside the link */
  children: PropTypes.node,
  /** Makes the link open in a new tab */
  external: PropTypes.bool,
  /** The url to link to */
  url: PropTypes.string.isRequired,
};
