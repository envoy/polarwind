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
  console.log("[polarwind] setParent", { value });
  parent.current = value;
}

function sendMessage(message) {
  console.log("[polarwind] sendMessage", { message, parent });
  parent.current.sendMessage(message);
}

function ParentProvider({ children }) {
  const [, setParent] = useParent();
  const origin = useContext(OriginContext);
  const [context, setContext] = useState({});

  useEffect(() => {
    console.log("[polaris] iframeResizerContentWindow useEffect called", {
      origin,
      setContext,
      setParent,
    });
    iframeResizerContentWindow({
      onMessage: (message) => {
        console.log("[polaris] onMessage", { message });
        switch (message.event) {
          case "context": {
            setContext(message.context);
            break;
          }
        }
      },
      onReady: () => {
        setParent(window.parentIFrame);
        // can't use sendMessage here because it looks like it needs a tick before
        // parent.current has the iframe
        window.parentIFrame.sendMessage({ event: "ready" });
      },
      targetOrigin: origin,
    });
  }, [origin, setParent]);

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
