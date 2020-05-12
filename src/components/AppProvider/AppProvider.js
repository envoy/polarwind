import PropTypes from "prop-types";
import { useEffect } from "react";
import { iframeResizerContentWindow } from "../../vendor/iframeResizer.contentWindow";

/**
 * App provider is a required component that enables sharing global settings throughout the hierarchy of your application.
 */
export const AppProvider = ({
  children,
  origin = "https://dashboard.envoy.com",
}) => {
  useEffect(() => {
    iframeResizerContentWindow({ targetOrigin: origin });
  });
  return children;
};

AppProvider.propTypes = {
  /** Inner content of the application */
  children: PropTypes.node,
  /** Envoy Dashboard origin */
  origin: PropTypes.string,
};
