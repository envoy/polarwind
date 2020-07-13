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

function receiveMessage(message) {
  switch (message.event) {
    case "context": {
      console.log("[polarwind] received context", {
        context: message.context,
      });
      const action = { payload: message.context, type: "context" };
      console.log("[polarwind] dispatching", { action });
      break;
    }
  }
}

// try additive context
// function reducer(state, action) {
//   console.log("[polarwind] reducer called", { action, state });
//   switch (action.type) {
//     case "context": {
//       return {
//         ...state,
//         ...action.payload,
//       };
//     }
//   }
// }
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
  return [sendMessage, receiveMessage, setParent];
}

function useParentContext() {
  return useContext(ParentContext);
}

export { useParent, useParentContext, ParentProvider };
