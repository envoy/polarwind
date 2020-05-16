import classnames from "classnames/bind";
import PropTypes from "prop-types";
import { useContext } from "react";
import { EmbeddedContext } from "../../utils/embedded";
import { Header } from "./components";
import styles from "./Page.module.css";

const cx = classnames.bind(styles);

/**
 * Use to build the outer wrapper of a page, including the page title and associated
 * actions.
 */
export const Page = ({ breadcrumbs, children, title, titleAction }) => {
  const embedded = useContext(EmbeddedContext);

  const className = cx({
    Page: true,
    standalone: !embedded,
  });

  const PageMarkup = (props) => {
    return (
      <div className={className} {...props}>
        <Header action={titleAction} breadcrumbs={breadcrumbs}>
          {title}
        </Header>
        {children}
      </div>
    );
  };

  return embedded ? (
    <PageMarkup data-iframe-height />
  ) : (
    <div className={styles.wrapper} data-iframe-height>
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
  /** Page title, in large type */
  title: PropTypes.string,
  /** Actions to present on the right of the title */
  titleAction: PropTypes.node,
};

Page.Header = Header;
