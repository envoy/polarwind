# Polarwind

Polarwind is a React component library for the Envoy design system.

## Technical design

### Component API

API design is hard. Component libraries are no different. Among the decisions when
authoring a component library are things like:

- What low-level components to expose?
- How much customization do we allow? What is the mechanism: props, children, or render
  props?
- Which props expect booleans, enums or entire component fragment?
- What is the combinatorial explosion of having too many props? How to we control for
  mutually exclusive props where some combination of props don't make sense?
- What high value turnkey components should we provide? An example of a turnkey component
  is a Resource List which exposes facilities for bulk selection and action

A lot of these decisions have been made by Polaris, a battle tested component library used
by third-party developers on the Shopify marketplace. Polarwind borrows heavily from the
Polaris component API.

### CSS

Polarwind relies heavily on Tailwind CSS, a utility-first CSS framework. It configures
the default Tailwind theme with Envoy-specific color palette (to the extent of removing colors
and levels that don't exist in the design system) and font scales.

Polarwind uses Tailwind philosophy of styling the entire state of a component and using
pseudo selectors to override values. This paves the way for mobile-first designs that
adapt to larger screens.

The transpiled CSS is then tree shaken to remove unused styles via PurgeCSS to produce the
smallest CSS file needed.

### CSS-in-JS

Polarwind uses CSS Modules. CSS Modules locally scope CSS by automatically creating a
unique class name. This allows you to use the same CSS class name in different files
without worrying about collisions. For defining the CSS properties themselves, Polarwind
heavily uses `@apply` of Tailwind utility classes.

## Guiding principles

1. First class accessibility support for screen readers and keyboard interaction (escaping
   out of menus, arrow keys, focus states for tab navigation)
2. First class support for mobile with appropriate design for small screens, respecting
   dark mode and reduced motion.
3. Excellent documentation and interactive examples.
4. Every component must be deliveried with comprehensive visual and accessibility testing
   for components.
5. A realistic host application that uses the component to validate that the pieces fit
   together as a whole.
6. Components are built to cover just enough of what we currently need instead of being
   fully featured. As more use cases emerge, we will add more capabilities and
   customization to the respective components.

## License

Source code is under a [custom license](LICENSE.md) based on MIT. The license restricts
Polarwind usage to applications that integrate or interoperate with Envoy software or
services, with additional restrictions for external, stand-alone applications.

## Trivia

Polarwind is a portmanteau of Polaris and Tailwind CSS.
