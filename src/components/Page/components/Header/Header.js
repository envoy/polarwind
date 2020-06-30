import classnames from "classnames/bind";
import PropTypes from "prop-types";
import { Back } from "../../../../icons";
import { DisplayText } from "../../../DisplayText";
import { UnstyledLink } from "../../../UnstyledLink/UnstyledLink";
import styles from "../../Page.module.css";

const cx = classnames.bind(styles);

/**
 * The header of a page. This is a container of several things potentially, like a back
 * button, input fields.
 */
export const Header = ({ action, breadcrumbs = [], children }) => {
  const className = cx({
    Header: true,
  });

  const breadcrumb = breadcrumbs[breadcrumbs.length - 1];
  const breadcrumbMarkup = breadcrumb && (
    <UnstyledLink
      className={styles.breadcrumb}
      title={breadcrumb.content}
      url={breadcrumb.url}
    >
      <Back />
    </UnstyledLink>
  );

  return (
    <div className={className}>
      {breadcrumbMarkup}
      <DisplayText element="h1" size="large">
        {children}
      </DisplayText>
      {action}
    </div>
  );
};

Header.propTypes = {
  /** Header action */
  action: PropTypes.node,
  /** Collection of breadcrumbs */
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string,
      url: PropTypes.string.isRequired,
    })
  ),
  /** The title */
  children: PropTypes.node,
};

Header.displayName = "Page.Header";
