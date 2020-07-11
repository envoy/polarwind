import PropTypes from "prop-types";
import { useEffect } from "react";
import { EmbeddedContext } from "../../utils/embedded";
import { OriginContext } from "../../utils/origin";
import { useParent } from "../../utils/parent";
import { iframeResizerContentWindow } from "../../vendor/iframeResizer.contentWindow";

/**
 * App provider is a required component that enables sharing global settings throughout the hierarchy of your application.
 */
export const AppProvider = ({
  children,
  embedded = true,
  origin = "https://dashboard.envoy.com",
}) => {
  const [sendMessage, receiveMessage, setParent] = useParent();

  useEffect(() => {
    iframeResizerContentWindow({
      onMessage: receiveMessage,
      onReady: () => {
        setParent(window.parentIFrame);
        window.parentIFrame.sendMessage({ event: "ready" });
      },
      targetOrigin: origin,
    });
  }, [origin, sendMessage, receiveMessage, setParent]);

  return (
    <EmbeddedContext.Provider value={embedded}>
      <OriginContext.Provider value={origin}>{children}</OriginContext.Provider>
    </EmbeddedContext.Provider>
  );
};

AppProvider.propTypes = {
  /** Inner content of the application */
  children: PropTypes.node,
  /** Set whether running in embedded or standalone mode */
  embedded: PropTypes.bool,
  /** Envoy Dashboard origin */
  origin: PropTypes.string,
};
