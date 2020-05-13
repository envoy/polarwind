import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { StandaloneContext } from "../../utils/standalone";
import { iframeResizerContentWindow } from "../../vendor/iframeResizer.contentWindow";

/**
 * App provider is a required component that enables sharing global settings throughout the hierarchy of your application.
 */
export const AppProvider = ({
  children,
  origin = "https://dashboard.envoy.com",
}) => {
  const [isEmbedded, setIsEmbedded] = useState(false);

  useEffect(() => {
    iframeResizerContentWindow({
      readyCallback: () => setIsEmbedded(true),
      targetOrigin: origin,
    });
  });

  return (
    <StandaloneContext.Provider value={!isEmbedded}>
      {children}
    </StandaloneContext.Provider>
  );
};

AppProvider.propTypes = {
  /** Inner content of the application */
  children: PropTypes.node,
  /** Envoy Dashboard origin */
  origin: PropTypes.string,
};
