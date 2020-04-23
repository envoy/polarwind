import PropTypes from "prop-types";
import styles from "./Label.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export const Label = ({ children, hidden, id, required }) => {
  const className = cx({ Label: true, hidden, required });

  return (
    <label htmlFor={id} className={className}>
      {children}
    </label>
  );
};

Label.propTypes = {
  /** Label for the input */
  children: PropTypes.node,
  /** Visually hide the label */
  hidden: PropTypes.bool,
  /** ID of the field */
  id: PropTypes.string.isRequired,
  /** Displays a required indicator */
  required: PropTypes.bool,
};
