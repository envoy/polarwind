import { useListBoxSection } from "@react-aria/listbox";
import classnames from "classnames/bind";
import PropTypes from "prop-types";
import styles from "../../Select.module.css";
import { Option } from "../Option";

const cx = classnames.bind(styles);

/**
 * Internal component that implements optgroup for grouped options
 */
export const OptionGroup = ({ group, state }) => {
  const { groupProps, headingProps, itemProps } = useListBoxSection({
    "aria-label": group["aria-label"],
    heading: group.rendered,
  });

  const className = cx({
    OptionGroup: true,
  });

  return (
    <li {...itemProps} className={className}>
      {group.rendered && <span {...headingProps}>{group.rendered}</span>}

      <ul {...groupProps}>
        {[...group.childNodes].map((node) => (
          <Option item={node} key={node.key} state={state} />
        ))}
      </ul>
    </li>
  );
};

OptionGroup.propTypes = {
  /** The optgroup */
  group: PropTypes.shape({
    "aria-label": PropTypes.string,
    childNodes: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    key: PropTypes.string.isRequired,
    rendered: PropTypes.string,
  }),
  /** The OptionList state object */
  state: PropTypes.shape({
    collection: PropTypes.shape({
      getFirstKey: PropTypes.func,
    }),
  }),
};

OptionGroup.displayName = "Select.OptionGroup";
