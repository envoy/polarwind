import classNames from "classnames/bind";
import PropTypes from "prop-types";
import styles from "./Label.module.css";

const cx = classNames.bind(styles);

export const Label = ({ children, className, hidden, label, required }) => {
  const spanClassName = cx({ Label: true, hidden, required });

  return (
    <label className={className}>
      <span className={spanClassName}>{label}</span>
      {children}
    </label>
  );
};

Label.propTypes = {
  /** The nested input */
  children: PropTypes.node,
  /** Additional className to add to the label */
  className: PropTypes.string,
  /** Visually hide the label */
  hidden: PropTypes.bool,
  /** Label for the input */
  label: PropTypes.node,
  /** Displays a required indicator */
  required: PropTypes.bool,
};
