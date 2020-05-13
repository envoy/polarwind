# Technical design

## Component API

API design is hard. Component libraries are no different. Among the decisions when
authoring a component library are things like:

- What low-level components to expose?
- How much customization do we allow? What is the mechanism: props, children, or render
  props?
- Which props expect booleans, enums or entire component fragment?
- What is the combinatorial explosion of having too many props? How to we control for
  mutually exclusive props where some combination of props don't make sense?
- What high value turnkey components should we provide? An example of a turnkey component
  is a Resource List which exposes facilities for bulk selection and action.

A lot of these decisions have been made by [Polaris](https://polaris.shopify.com), a
battle tested component library used by third-party developers on the Shopify marketplace.
Polarwind borrows heavily from the Polaris component API.

## CSS

Polarwind relies heavily on Tailwind CSS, a utility-first CSS framework. It configures
the default Tailwind theme with Envoy-specific color palette (to the extent of removing colors
and levels that don't exist in the design system) and font scales.

Polarwind uses Tailwind philosophy of styling the entire state of a component and using
pseudo selectors to override values. This paves the way for mobile-first designs that
adapt to larger screens.

The transpiled CSS is then trimmed to remove unused styles via PurgeCSS to produce the
smallest CSS file needed.

## CSS-in-JS

Polarwind uses CSS Modules. CSS Modules locally scope CSS by automatically creating a
unique class name. This allows you to use the same CSS class name in different files
without worrying about collisions. For defining the CSS properties themselves, Polarwind
heavily uses `@apply` of Tailwind utility classes.
