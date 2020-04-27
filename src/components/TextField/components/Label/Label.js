import PropTypes from "prop-types";
import styles from "./Label.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export const Label = ({ children, hidden, label, required }) => {
  const className = cx({ Label: true, hidden, required });

  return (
    <label>
      <span className={className}>{label}</span>
      {children}
    </label>
  );
};

Label.propTypes = {
  /** The nested input */
  children: PropTypes.node,
  /** Visually hide the label */
  hidden: PropTypes.bool,
  /** ID of the field */
  id: PropTypes.string.isRequired,
  /** Label for the input */
  label: PropTypes.node,
  /** Displays a required indicator */
  required: PropTypes.bool,
};
