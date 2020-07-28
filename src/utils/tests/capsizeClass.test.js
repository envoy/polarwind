import { capsizeClass } from "../capsizeClass";

test("generates default classname when called with no arguments", () => {
  expect(capsizeClass()).toEqual("capsize-normal-normal-base-normal");
});

test("replaces the font weight", () => {
  expect(capsizeClass("font-medium")).toEqual(
    "capsize-medium-normal-base-normal"
  );
});

test("replaces the font weight with the first class it matches", () => {
  expect(capsizeClass("font-medium", "font-bold")).toEqual(
    "capsize-medium-normal-base-normal"
  );
});

test("ignores font weights that are not in the theme", () => {
  // tailwind.config.js only defines normal, medium and bold
  expect(capsizeClass("font-extrabold")).toEqual(
    "capsize-normal-normal-base-normal"
  );
});

test("replaces the font style", () => {
  expect(capsizeClass("italic")).toEqual("capsize-normal-italic-base-normal");
});

test("disambiguates text size and text color classes even though they share the same prefix", () => {
  expect(capsizeClass("text-lg", "text-white")).toEqual(
    "capsize-normal-normal-lg-normal"
  );
});

test("replaces the line heights", () => {
  expect(capsizeClass("leading-tight")).toEqual(
    "capsize-normal-normal-base-tight"
  );
});

test("supports object arguments", () => {
  expect(
    capsizeClass({
      "font-bold": false,
      "leading-tight": true,
      "text-lg": "truthy",
    })
  ).toEqual("capsize-normal-normal-lg-tight");
});

test("supports mixed string and object arguments", () => {
  expect(
    capsizeClass(
      "italic",
      {
        "font-bold": false,
        "text-lg": "truthy",
      },
      "leading-tight",
      {
        "font-medium": true,
        "text-xs": false,
      }
    )
  ).toEqual("capsize-medium-italic-lg-tight");
});

test("why isnt this working", () => {
  const size = "small";
  const secondary = false;
  expect(
    capsizeClass(
      {
        "font-normal": secondary,
        "text-2xl": size === "large",
        "text-3xl": size === "extraLarge",
        "text-lg": size === "small",
        "text-xl": size === "medium",
      },
      "font-bold",
      "leading-normal"
    )
  ).toEqual("capsize-bold-normal-lg-normal");
});
