const path = require("path");
const { camelCase } = require("change-case");

const COMPONENT_REGEX = /^[A-Z]\w+$/;
const SUBCOMPONENT_VARIATION_SELECTOR = /^\w+-\w+$/;
const NESTED_COMPONENT_PATH_REGEX = /.*\/components\/(.*)\/components/;

const generateScopedName = ({ extension, prefix }) => {
  function prefixedClassName(className) {
    return `${prefix}-${className}`;
  }

  function isComponent(className) {
    return COMPONENT_REGEX.test(className);
  }

  // leaves classnames like .Polarwind-Label untouched
  function isAbsoluteClassName(className) {
    return className.startsWith(prefix);
  }

  function subcomponentClassName(component, subcomponent) {
    return `${component}__${subcomponent}`;
  }

  function variationClassName(component, variation) {
    return `${component}--${variation}`;
  }

  return (localName, filePath) => {
    const componentName = path.basename(filePath, extension);
    const nestedComponentMatch = NESTED_COMPONENT_PATH_REGEX.exec(filePath);

    if (isAbsoluteClassName(localName)) {
      return localName;
    }

    const polarwindComponentName =
      nestedComponentMatch && nestedComponentMatch.length > 1
        ? `${prefixedClassName(nestedComponentMatch[1])}-${componentName}`
        : prefixedClassName(componentName);

    let className;

    if (isComponent(localName)) {
      className =
        componentName === localName
          ? polarwindComponentName
          : subcomponentClassName(polarwindComponentName, localName);
    } else if (SUBCOMPONENT_VARIATION_SELECTOR.test(localName)) {
      const [subcomponent, variation] = localName.split("-");
      const subcomponentName = subcomponentClassName(
        polarwindComponentName,
        subcomponent
      );
      className = variationClassName(subcomponentName, camelCase(variation));
    } else {
      className = variationClassName(
        polarwindComponentName,
        camelCase(localName)
      );
    }

    return className;
  };
};

module.exports = { generateScopedName };
