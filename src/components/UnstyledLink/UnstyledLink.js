import PropTypes from "prop-types";
import { useCallback, useContext } from "react";
import { EmbeddedContext } from "../../utils/embedded";
import { OriginContext } from "../../utils/origin";
import { ParentContext } from "../../utils/parent";

function isAbsoluteUrlFor(url, host) {
  return url.startsWith(host);
}

function isAbsolutePath(url) {
  return url.startsWith("/");
}

function isOwnUrl(url) {
  return isAbsolutePath(url) || isAbsoluteUrlFor(url, window.location);
}

/**
 * An internal component used by components that are link-like, like `Link` and `Button`.
 * It provides behaviors when dealing with internal and external links, and sending
 * navigation events to the parent if run in an embedded way.
 */
export const UnstyledLink = ({ children, external, onClick, url, ...rest }) => {
  const origin = useContext(OriginContext);
  const embedded = useContext(EmbeddedContext);
  const parent = useContext(ParentContext);

  const isHostUrl = isAbsoluteUrlFor(url, origin);
  const isThirdPartyUrl = !isOwnUrl(url) && !isHostUrl;
  // popup when explicitly set. if it's not set, popup when it's a third party url in
  // embedded mode
  const popup = external ?? (embedded && isThirdPartyUrl);
  const sendMessage = embedded && isHostUrl;

  const handleClick = useCallback(
    (e) => {
      onClick && onClick();
      if (sendMessage) {
        e.preventDefault();
        parent.sendMessage({
          event: "navigate",
          url: e.currentTarget.href,
        });
      }
    },
    [sendMessage, parent, onClick]
  );

  const target = popup ? "_blank" : undefined;
  const rel = popup ? "noopener noreferrer" : undefined;

  return (
    <a {...rest} href={url} rel={rel} target={target} onClick={handleClick}>
      {children}
    </a>
  );
};

UnstyledLink.propTypes = {
  /** The content to display inside the link */
  children: PropTypes.node,
  /** Makes the link open in a new tab */
  external: PropTypes.bool,
  /** Callback when a link is clicked */
  onClick: PropTypes.func,
  /** The url to link to */
  url: PropTypes.string.isRequired,
};
