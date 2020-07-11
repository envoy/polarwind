import { createRef } from "react";
const parent = createRef();

function setParent(value) {
  parent.current = value;
}

function useParent() {
  return [parent, setParent];
}

export { useParent };
