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
        {tabs.map(({ content, id, onClick, url }, index) => (
          <Tab
            key={id}
            selected={selected === index}
            url={url}
            onClick={() => {
              onClick?.call(this);
              onSelect?.call(this, index);
            }}
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
      /** Content for the tab */
      content: PropTypes.string.isRequired,
      /** A unique identifier for the tab */
      id: PropTypes.string.isRequired,
      /** Handler when tab is clicked */
      onClick: PropTypes.func,
      /** A destination to link to */
      url: PropTypes.string,
    })
  ).isRequired,
};

Tabs.Tab = Tab;
