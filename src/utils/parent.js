import PropTypes from "prop-types";
import {
  createContext,
  createRef,
  useContext,
  useEffect,
  useState,
} from "react";
import { iframeResizerContentWindow } from "../vendor/iframeResizer.contentWindow";
import { OriginContext } from "./origin";

const parent = createRef();
const ParentContext = createContext({ default: "what" });

function setParent(value) {
  parent.current = () => value;
}

function sendMessage(message) {
  parent.current().sendMessage(message);
}

function ParentProvider({ children }) {
  const origin = useContext(OriginContext);
  const [sendMessage, setParent] = useParent();
  const [context, setContext] = useState({});

  useEffect(() => {
    console.log("[polaris] iframeResizerContentWindow useEffect called", {
      origin,
      setContext,
      setParent,
    });
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
        sendMessage({ event: "ready" });
      },
      targetOrigin: origin,
    });
  }, [origin, sendMessage, setParent]);

  return (
    <ParentContext.Provider value={context}>{children}</ParentContext.Provider>
  );
}

ParentProvider.propTypes = {
  /** Inner content of the application */
  children: PropTypes.node,
};

function useParent() {
  return [sendMessage, setParent];
}

function useParentContext() {
  return useContext(ParentContext);
}

export { useParent, useParentContext, ParentProvider };
