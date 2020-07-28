import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config.js";

const fullConfig = resolveConfig(tailwindConfig);

/**
 * Generates an array of class names for the given tailwind theme key.
 *
 * @param {string} themeKey - the config in tailwind's theme object
 * @param {*} prefix - the utility class prefix, e.g. "font", "text"
 */
function generateClassNames(themeKey, prefix) {
  return Object.keys(fullConfig.theme[themeKey]).map(
    (modifier) => `${prefix}-${modifier}`
  );
}

const fontWeightClassNames = generateClassNames("fontWeight", "font");
const fontStyleClassNames = ["italic", "not-italic"];
const fontSizeClassNames = generateClassNames("fontSize", "text");
const lineHeightClassNames = generateClassNames("lineHeight", "leading");

/**
 * Generates a partial function that is bound to an array of tailwind classes. When the
 * partial function is applied to a list of user-provided classnames, it fetches the first
 * classname that exists in tailwindClassNames and extracts the modifier part of the
 * classname.
 *
 * @param {function(classnames) -> string | undefined} tailwindClassNames - array of
 * tailwind utility classes
 */
function extractModifier(tailwindClassNames) {
  return function (classNames) {
    return classNames
      .find((c) => tailwindClassNames.includes(c))
      ?.split("-")[1];
  };
}

const extractWeight = extractModifier(fontWeightClassNames);
const extractSize = extractModifier(fontSizeClassNames);
const extractLineHeight = extractModifier(lineHeightClassNames);
const extractStyle = (classNames) => {
  return classNames.filter((c) => fontStyleClassNames.includes(c))[0] ===
    "italic"
    ? "italic"
    : "normal";
};

/**
 * Returns an array of classes given an array of objects or strings. For objects, only
 * truthy entries are kept and their keys returned.
 *
 * @param  {string | object} classes
 */
function normalizeClasses(classes) {
  return classes
    .map((c) => {
      if (typeof c === "object") {
        const keys = Object.keys(c);
        return keys.filter((k) => Boolean(c[k]));
      } else {
        return c;
      }
    })
    .flat();
}

/**
 * Generates a capsize classname with the form
 * capsize-<weight>-<style>-<size>-<line-height> given the classes. If an override is not
 * provided, it will return default values in those slots.
 *
 * @param  {string[] | object} classes
 */
function capsizeClass(...classes) {
  classes = normalizeClasses(classes);
  const weight = extractWeight(classes) || "normal";
  let style = extractStyle(classes) || "normal";
  let size = extractSize(classes) || "base";
  let lineHeight = extractLineHeight(classes) || "normal";
  return ["capsize", weight, style, size, lineHeight].join("-");
}

export { capsizeClass };
