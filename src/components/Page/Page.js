import classnames from "classnames/bind";
import PropTypes from "prop-types";
import { useContext } from "react";
import { EmbeddedContext } from "../../utils/embedded";
import { Header, Title } from "./components";
import styles from "./Page.module.css";

const cx = classnames.bind(styles);

/**
 * Use to build the outer wrapper of a page, including the page title and associated
 * actions.
 */
export const Page = ({
  breadcrumbs,
  children,
  tabs,
  title,
  titleAction,
  transparent,
}) => {
  const embedded = useContext(EmbeddedContext);

  const className = cx({
    Page: true,
    standalone: !embedded,
    transparent,
    withHeader: title,
  });

  const wrapperClassName = cx({
    transparent,
    wrapper: true,
  });

  const headerMarkup = title && (
    <Header>
      <Title action={titleAction} breadcrumbs={breadcrumbs}>
        {title}
      </Title>
      {tabs}
    </Header>
  );

  const PageMarkup = (props) => {
    return (
      <div className={className} {...props}>
        {headerMarkup}
        {children}
      </div>
    );
  };

  return embedded ? (
    <PageMarkup data-iframe-height />
  ) : (
    <div className={wrapperClassName} data-iframe-height>
      <PageMarkup />
    </div>
  );
};

Page.propTypes = {
  /** Collection of breadcrumbs */
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string,
      url: PropTypes.string.isRequired,
    })
  ),
  /** The contents of the page */
  children: PropTypes.node,
  /** Top-level tabs */
  tabs: PropTypes.node,
  /** Page title, in large type */
  title: PropTypes.string,
  /** Actions to present on the right of the title */
  titleAction: PropTypes.node,
  /** Alternate page design */
  transparent: PropTypes.bool,
};

Page.Header = Header;
Page.Title = Title;
