import classnames from "classnames/bind";
import PropTypes from "prop-types";
import { Item } from "./components";
import styles from "./FormLayout.module.css";

const cx = classnames.bind(styles);

/**
 * Use form layout to arrange fields within a form using standard spacing. By default it
 * stacks fields vertically but also supports horizontal groups of fields.
 */
export const FormLayout = ({ children }) => {
  const className = cx({
    FormLayout: true,
  });
  return (
    <div className={className}>
      {children.map((child, i) => (
        <Item key={i}>{child}</Item>
      ))}
    </div>
  );
};

FormLayout.propTypes = {
  /** The content to display inside the layout */
  children: PropTypes.node,
};

FormLayout.Item = Item;
