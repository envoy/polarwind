import PropTypes from "prop-types";
import { UnstyledLink } from "../UnstyledLink";

/**
 * Internal component to choose between a UnstyledLink or button
 */
export const Linkable = ({ children, url, ...rest }) => {
  return url ? (
    <UnstyledLink {...rest} url={url}>
      {children}
    </UnstyledLink>
  ) : (
    <button {...rest} type="button">
      {children}
    </button>
  );
};

Linkable.propTypes = {
  /** The content to display inside the link */
  children: PropTypes.node,
  /** The url to link to */
  url: PropTypes.string,
};
