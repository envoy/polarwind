import classNames from "classnames/bind";
import PropTypes from "prop-types";
import styles from "./Label.module.css";

const cx = classNames.bind(styles);

export const Label = ({ children, className, hidden, label, required }) => {
  // this is a fix for the label stealing the focus of the checkbox when the checkbox is
  // already focused. without this fix, it looks janky that the checkbox loses the focus
  // ring only to have it again after you release the mouse.
  const handleMouseDown = (event) => {
    event.preventDefault();
  };

  const spanClassName = cx({ Label: true, hidden, required });

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <label className={className} onMouseDown={handleMouseDown}>
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
  label: PropTypes.node.isRequired,
  /** Displays a required indicator */
  required: PropTypes.bool,
};
