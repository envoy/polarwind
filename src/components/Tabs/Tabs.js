import classnames from "classnames/bind";
import PropTypes from "prop-types";
import { Children, isValidElement } from "react";
import { isElementOfType } from "../../utils/components";
import { Tab } from "./components";
import styles from "./Tabs.module.css";

const cx = classnames.bind(styles);

/**
 * Use to alternate among related views within the same context.
 */
export const Tabs = ({ children, onSelect, selected, tabs }) => {
  const handleSelect = (index) => () => {
    onSelect && onSelect(index);
  };

  const className = cx({
    Tabs: true,
  });

  const tabsIterator = (cb) =>
    Children.count(children) > 0 ? Children.map(children, cb) : tabs.map(cb);

  return (
    <ul className={className}>
      {tabsIterator((tab, index) => {
        if (isValidElement(tab)) {
          if (isElementOfType(tab, Tab)) {
            return tab;
          } else {
            return (
              <Tab
                key={index}
                selected={selected === index}
                url={tab.props.href}
                onClick={handleSelect(index)}
              >
                {tab.props.children}
              </Tab>
            );
          }
        } else {
          return (
            <Tab
              key={index}
              selected={selected === index}
              url={tab.url}
              onClick={handleSelect(index)}
            >
              {tab.content}
            </Tab>
          );
        }
      })}
    </ul>
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
      /** A destination to link to */
      url: PropTypes.string,
    })
  ),
};

Tabs.Tab = Tab;
