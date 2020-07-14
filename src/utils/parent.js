import { createRef, useContext } from "react";
import { ParentContext } from "../components/ParentProvider";

/** Holds the instance of window.parentIFrame */
const parent = createRef();

/** Sets the current parent in a closure to always return the fresh value */
function setParent(value) {
  parent.current = () => value;
}

/** Delegates sendMessage to the current parent */
function sendMessage(message) {
  parent.current().sendMessage(message);
}

/** Returns the context object set by the host iframe */
function useParentContext() {
  const context = useContext(ParentContext);
  if (context === undefined) {
    throw new Error("useCountState must be used within a ParentProvider");
  }
  return context;
}

/**
 * Utility functions to interact with the parent.
 *
 * context - the context object set by the parent iframe
 * sendMessage - used to send arbitrary messages back to the parent iframe
 * setParent - used to set an instance of window.parentIFrame
 */
function useParent() {
  const context = useParentContext();
  return { context, sendMessage, setParent };
}

export { useParent };
