import { createRef } from "react";
const parent = createRef();

function setParent(value) {
  parent.current = value;
}

function sendMessage(message) {
  parent.current.sendMessage(message);
}

function useParent() {
  return [sendMessage, setParent];
}

export { useParent };
