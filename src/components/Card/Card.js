import classnames from "classnames/bind";
import PropTypes from "prop-types";
import styles from "./Card.module.css";

const cx = classnames.bind(styles);

/**
 * Cards are used to group similar concepts and tasks together to make Envoy easier for
 * users to scan, read, and get things done.
 */
export const Card = ({ children, shadow }) => {
  const className = cx({
    Card: true,
    // workaround a tailwind or postcss bug where class names cannot be the same as the
    // @apply rule https://github.com/tailwindcss/tailwindcss/issues/2036
    shadowed: shadow,
  });
  return <div className={className}>{children}</div>;
};

Card.propTypes = {
  /** Inner content of the card */
  children: PropTypes.node,
  /** The shadow variant of card */
  shadow: PropTypes.bool,
};
