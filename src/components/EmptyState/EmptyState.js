import classnames from "classnames/bind";
import PropTypes from "prop-types";
import { Card } from "../Card";
import { DisplayText } from "../DisplayText";
import { Stack } from "../Stack";
import styles from "./EmptyState.module.css";

const cx = classnames.bind(styles);

/**
 * Empty states are used when a list, table, or chart has no items or data to show. This
 * is an opportunity to provide explanation or guidance to help users progress. The
 * empty state component is intended for use when a full page in the admin is empty, and
 * not for individual elements or areas in the interface.
 */
export const EmptyState = ({ children, heading, image }) => {
  const className = cx({
    EmptyState: true,
  });

  const headingMarkup = heading && (
    <DisplayText element="h2" size="large">
      {heading}
    </DisplayText>
  );

  const copyMarkup = (headingMarkup || children) && (
    <Stack spacing="looser" vertical>
      {headingMarkup}
      {children}
    </Stack>
  );

  return (
    <Card shadow>
      <div className={className}>
        {copyMarkup}
        <img alt="Empty state illustration" src={image} />
      </div>
    </Card>
  );
};

EmptyState.propTypes = {
  /** Elements to display inside empty state */
  children: PropTypes.node,
  /** The empty state heading */
  heading: PropTypes.string,
  /**
   * The path to the image to display. The image should have ~40px of white space above
   * when empty state is used within a card, modal, or navigation component
   */
  image: PropTypes.string.isRequired,
};
