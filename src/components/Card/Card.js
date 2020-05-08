import classnames from "classnames/bind";
import PropTypes from "prop-types";
import styles from "./Card.module.css";

const cx = classnames.bind(styles);

/**
 * Cards are used to group similar concepts and tasks together to make Envoy easier for
 * users to scan, read, and get things done.
 */
export const Card = ({ children }) => {
  const className = cx({
    Card: true,
  });
  return <div className={className}>{children}</div>;
};

Card.propTypes = {
  /** Inner content of the card */
  children: PropTypes.node,
};
