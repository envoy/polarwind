import { createContext, createRef, useContext } from "react";

const parent = createRef();
const ParentContext = createContext();

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
      console.log("[polarwind] received context", { context: message.context });
      break;
    }
  }
}

function useParent() {
  return [sendMessage, receiveMessage, setParent];
}

function useParentContext() {
  return useContext(ParentContext);
}

export { useParent, useParentContext };
