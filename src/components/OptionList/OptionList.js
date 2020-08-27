import classnames from "classnames/bind";
import PropTypes from "prop-types";
import styles from "./OptionList.module.css";

const cx = classnames.bind(styles);

/**
 * Returns selected plus item if it doesn't already exist, or if it exists, return
 * selected minus item.
 *
 * @param {string[]} selected
 * @param {string} item
 */
function toggleSelected(selected, item) {
  const index = selected.indexOf(item);

  return index < 0
    ? [...selected, item]
    : [...selected.slice(0, index), ...selected.slice(index + 1)];
}

/**
 * FIXME: Description of OptionList
 */
export const OptionList = ({ allowMultiple, onChange, options, selected }) => {
  const className = cx({
    OptionList: true,
  });

  return (
    <ul className={className}>
      {options.map(({ disabled, label, value }) => {
        const isSelected = selected.includes(value);
        const optionClassName = cx({
          Option: true,
        });
        const optionButtonClassName = cx({
          selected: isSelected,
        });

        return (
          <li className={optionClassName} key={value}>
            <button
              className={optionButtonClassName}
              disabled={disabled}
              onClick={() => {
                onChange(
                  allowMultiple ? toggleSelected(selected, value) : [value]
                );
              }}
            >
              {label}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

OptionList.propTypes = {
  allowMultiple: PropTypes.bool,
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
