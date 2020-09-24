import classnames from "classnames/bind";
import PropTypes from "prop-types";
import { Children, cloneElement, isValidElement } from "react";
import { isElementOfType } from "../../utils/components";
import { Tab } from "./components";
import styles from "./Tabs.module.css";

const cx = classnames.bind(styles);

/**
 * Use to alternate among related views within the same context.
 */
export const Tabs = ({ children, onSelect, selected, tabs }) => {
  const handleSelect = (index, onClick) => () => {
    onSelect?.(index);
    onClick?.();
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
            return cloneElement(tab, {
              key: index,
              onClick: handleSelect(index, tab.props.onClick),
              selected: selected === index,
            });
          } else {
            return (
              <Tab
                key={index}
                selected={selected === index}
                url={tab.props.href}
                onClick={handleSelect(index, tab.props.onClick)}
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
              onClick={handleSelect(index, tab.onClick)}
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
    PropTypes.oneOfType([
      PropTypes.shape({
        /** Content for the tab */
        content: PropTypes.string.isRequired,
        /** An additional onClick handler to execute */
        onClick: PropTypes.func,
        /** A destination to link to */
        url: PropTypes.string,
      }),
      PropTypes.node,
    ])
  ),
};

Tabs.Tab = Tab;
