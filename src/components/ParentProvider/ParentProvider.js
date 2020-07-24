import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { OriginContext } from "../../utils/origin";
import { ParentContext, useParent } from "../../utils/parent";
import { iframeResizerContentWindow } from "../../vendor/iframeResizer.contentWindow";

/**
 * Parent provider is a required component that enables the set up of the iframeResizer,
 * setting of the parent (window.parentIFrame) ref, and maintenance of the context object
 * sent by the parent. Not to be used on its own hence why it's not exported by
 * components/index.js. It is automatically included in the AppProvider stack.
 */
export const ParentProvider = ({ children }) => {
  const targetOrigin = useContext(OriginContext);
  const { sendMessage, setParent } = useParent();
  const [context, setContext] = useState({});

  useEffect(() => {
    iframeResizerContentWindow({
      onMessage: (message) => {
        switch (message.event) {
          case "context": {
            setContext(message.context);
            break;
          }
        }
      },
      onReady: () => {
        setParent(window.parentIFrame);
        // signal to iframe host to send the initial context
        sendMessage({ event: "ready" });
      },
      targetOrigin,
    });
  }, [targetOrigin, sendMessage, setParent]);

  return (
    <ParentContext.Provider value={context}>{children}</ParentContext.Provider>
  );
};

ParentProvider.propTypes = {
  /** Inner content of the application */
  children: PropTypes.node,
};
