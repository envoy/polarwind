import classnames from "classnames/bind";
import PropTypes from "prop-types";
import { Tab } from "./components";
import styles from "./Tabs.module.css";

const cx = classnames.bind(styles);

/**
 * Use to alternate among related views within the same context.
 */
export const Tabs = ({ children, onSelect, selected, tabs }) => {
  const className = cx({
    Tabs: true,
  });
  return (
    <>
      <ul className={className}>
        {tabs.map(({ content, id }, index) => (
          <Tab
            key={id}
            selected={selected === index}
            onClick={() => onSelect(index)}
          >
            {content}
          </Tab>
        ))}
      </ul>
      {children}
    </>
  );
};

Tabs.propTypes = {
  /** Content to display in tabs */
  children: PropTypes.node,
  /** Callback when tab is selected */
  onSelect: PropTypes.func,
  /** Index of selected tab */
  selected: PropTypes.number.isRequired,
  /** List of tabs */
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
};

Tabs.Tab = Tab;
