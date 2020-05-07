import classnames from "classnames/bind";
import PropTypes from "prop-types";
import styles from "./Page.module.css";

const cx = classnames.bind(styles);

/**
 * Use to build the outer wrapper of a page, including the page title and associated
 * actions.
 */
export const Page = ({ children, title }) => {
  const className = cx({
    Page: true,
  });
  return (
    <div className={className}>
      <h1>{title}</h1>
      {children}
    </div>
  );
};

Page.propTypes = {
  /** The contents of the page */
  children: PropTypes.node,
  /** Page title, in large type */
  title: PropTypes.string,
};
