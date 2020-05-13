import classnames from "classnames/bind";
import PropTypes from "prop-types";
import { useContext } from "react";
import { StandaloneContext } from "../../utils/standalone";
import { Header } from "./components";
import styles from "./Page.module.css";

const cx = classnames.bind(styles);

/**
 * Use to build the outer wrapper of a page, including the page title and associated
 * actions.
 */
export const Page = ({ breadcrumbs, children, title, titleAction }) => {
  const standalone = useContext(StandaloneContext);

  const className = cx({
    Page: true,
    standalone,
  });

  const pageMarkup = (
    <div className={className}>
      <Header action={titleAction} breadcrumbs={breadcrumbs}>
        {title}
      </Header>
      {children}
    </div>
  );

  return standalone ? (
    <div className={styles.wrapper}>{pageMarkup}</div>
  ) : (
    pageMarkup
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
