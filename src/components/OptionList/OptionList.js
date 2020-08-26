import classnames from "classnames/bind";
import PropTypes from "prop-types";
import styles from "./OptionList.module.css";

const cx = classnames.bind(styles);

/**
 * FIXME: Description of OptionList
 */
export const OptionList = ({ options, selected }) => {
  const className = cx({
    OptionList: true,
  });

  return (
    <ul className={className}>
      {options.map(({ label, value }) => {
        const optionClassName = cx({
          Option: true,
          selected: selected.includes(value),
        });

        return (
          <li className={optionClassName} key={value}>
            {label}
          </li>
        );
      })}
    </ul>
  );
};

OptionList.propTypes = {
  /** Callback when selection is changed */
  onChange: PropTypes.func.isRequired,
  /** List of options or option groups to choose from */
  options: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(
      PropTypes.shape({
        disabled: PropTypes.bool,
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      })
    ),
    PropTypes.arrayOf(
      PropTypes.shape({
        options: PropTypes.oneOfType([
          PropTypes.arrayOf(PropTypes.string),
          PropTypes.arrayOf(
            PropTypes.shape({
              disabled: PropTypes.bool,
              label: PropTypes.string.isRequired,
              value: PropTypes.string.isRequired,
            })
          ),
        ]).isRequired,
        title: PropTypes.string.isRequired,
      })
    ),
  ]),
  /** The selected options */
  selected: PropTypes.arrayOf(PropTypes.string).isRequired,
};
