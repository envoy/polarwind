import classnames from "classnames/bind";
import PropTypes from "prop-types";
import { Info, Success, Warning } from "../../icons";
import { Heading } from "../Heading";
import { Stack } from "../Stack";
import styles from "./Banner.module.css";

const cx = classnames.bind(styles);

const icons = {
  info: Info,
  success: Success,
  warning: Warning,
};

/**
 * Informs users about important changes or persistent conditions. Use this component
 * if you need to communicate to users in a prominent way. Banners are placed at the
 * top of the page or section they apply to, and below the page or section header.
 */
export const Banner = ({ children, status, title }) => {
  const className = cx("Banner", status);

  const IconComponent = icons[status];
  const titleMarkup = title && <Heading size="small">{title}</Heading>;

  return (
    <div className={className}>
      <span className={styles.Icon}>
        <IconComponent />
      </span>
      <Stack vertical>
        {titleMarkup}
        <div className={styles.Body}>{children}</div>
      </Stack>
    </div>
  );
};

Banner.propTypes = {
  /** The child elements to render in the banner. */
  children: PropTypes.node,
  /** Sets the status of the banner. */
  status: PropTypes.oneOf(["success", "info", "warning"]).isRequired,
  /** Title content for the banner. */
  title: PropTypes.string,
};
