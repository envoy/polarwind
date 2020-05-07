export function isElementOfType(element, Component) {
  if (typeof Component === "undefined") {
    return false;
  }
  return element.type.displayName === Component.displayName;
}

function _wrapWithComponent(element, Component, props) {
  return isElementOfType(element, Component) ? (
    element
  ) : (
    <Component {...props}>{element}</Component>
  );
}

/**
 * Wrap an element with a component. If you pass in an except option, elements that are
 * already of a certain component will not be wrapped.
 */
export const wrapWithComponent = (Component, { except, props } = {}) => (
  child,
  index
) =>
  isElementOfType(child, except)
    ? child
    : _wrapWithComponent(child, Component, { key: index, ...props });
