import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { EmbeddedContext } from "../../utils/embedded";
import { OriginContext } from "../../utils/origin";
import { ParentContext } from "../../utils/parent";
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
      onReady: () => setIsEmbedded(true),
      targetOrigin: origin,
    });
  });

  return (
    <EmbeddedContext.Provider value={isEmbedded}>
      <OriginContext.Provider value={origin}>
        <ParentContext.Provider value={window.parentIFrame}>
          {children}
        </ParentContext.Provider>
      </OriginContext.Provider>
    </EmbeddedContext.Provider>
  );
};

AppProvider.propTypes = {
  /** Inner content of the application */
  children: PropTypes.node,
  /** Envoy Dashboard origin */
  origin: PropTypes.string,
};
