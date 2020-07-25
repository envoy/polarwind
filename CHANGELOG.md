# Changelog

All notable changes to this project will be documented in this file.

The format is based on [these versioning and changelog guidelines](https://git.io/polaris-changelog-guidelines).

<!-- Unreleased changes should go to UNRELEASED.md -->

---

## 1.5.0 - 2020-07-25

### Breaking changes

- The Stack spacing `loose` is now `extraLoose`. `loose` has been made narrower and an
  intermediate spacing between `loose` and `extraLoose` has been added (see Enhancements)

### New components

- Add an Empty state component

### Enhancements

- Add a `labelHidden` prop to Select and Text field to visually hide the label. For Text
  fields, the label will be displayed as the placeholder instead.
- Add a spacing option `none` and `looser` to Stack
- Page accepts a `tabs` prop to render tabs within the header section so that we can apply
  a spacing exception to it (16px vs standard 32px).

### Bug fixes

- Apply various fixes to the Page header, especially when the title action and title don't
  fit in the narrowest supported width (600px)
- Fixed a bug where Select won't select the right options if options were set
  asynchronously

## 1.4.0 - 2020-07-17

### Enhancements

- Add a shadowed variant to Card for use on a "transparent" Page.
- Add a secondary variant to Heading and Display Text
- Add a transparent variant to Page. A transparent Page is a page without the usual
  card-like container.

### Bug fixes

- Fix items in a Stack with `fillEvenly` distribution to have equal size regardless of the
  content inside each item.

### Documentation

- Enabled knobs for most stories
- Added a Django example app

### Dependency upgrades

- Upgraded Tailwind to 1.5.1
- Upgraded Storybook packages to 5.3.19

## 1.3.0 - 2020-07-15

### Enhancements

- Plain and outline buttons now have a white background
  ([#150](https://github.com/envoy/polarwind/pull/150))
- Button and Link accept a download prop
  ([#150](https://github.com/envoy/polarwind/pull/150))

## 1.2.0 - 2020-07-15

### New components

- Icons are now exported. The only icons currently available are `User` and `Back`. These
  will likely move to a separate icons package.
  ([#142](https://github.com/envoy/polarwind/pull/142))

### Enhancements

- `Stack` now supports `equalSpacingAround` as a distribution option
  ([#142](https://github.com/envoy/polarwind/pull/142))
- `Stack` now supports the `wrap` option (defaults to true)
  ([#142](https://github.com/envoy/polarwind/pull/142))
- It is now possible for Polarwind apps to receive context set by the parent iframe.
  ([#145](https://github.com/envoy/polarwind/pull/145))

### Bug fixes

- `Stack` applies spacing correctly when in vertical mode
  ([#142](https://github.com/envoy/polarwind/pull/142))
- Remove negative margin when nesting a horizontal Stack inside a vertical Stack
  ([#147](https://github.com/envoy/polarwind/pull/147))

## 1.1.0 - 2020-05-23

### Breaking changes

- Removed `UnstyledLink` from the list of components we export. It's an internal component
  not meant to be used by consumers of the library
  [#122](https://github.com/envoy/polarwind/pull/122)
- Removed Labeled from being exported [#128](https://github.com/envoy/polarwind/pull/128)

### Enhancements

- Tab options now support a `url` key for tabs that link out to another page [#122](https://github.com/envoy/polarwind/pull/122)
- Tabs now have a hover state [#129](https://github.com/envoy/polarwind/pull/129)
- Updated input fields to match current design [#128](https://github.com/envoy/polarwind/pull/128)
- Added read-only support to Toggle [#128](https://github.com/envoy/polarwind/pull/128)
- Added an outline brand Button variation
  [#127](https://github.com/envoy/polarwind/pull/127)
- If you don't provide a title to a page, it will skip rendering the header. This is ideal
  for embedded plugins [#133](https://github.com/envoy/polarwind/pull/133)

### Bug fixes

- Fixes flash of standalone mode when going from non-react page to a react page
  [#109](https://github.com/envoy/polarwind/pull/109)
- Export Caption [#121](https://github.com/envoy/polarwind/pull/121)
- Fixed an issue where the iframe setup would be called multiple times, causing the host
  app to be unresponsive [#132](https://github.com/envoy/polarwind/pull/132)
- Fixed vertical alignment for input field placeholders in Safari [#128](https://github.com/envoy/polarwind/pull/128)
- Normalized Safari disabled input field font color (it was too faded by default) [#128](https://github.com/envoy/polarwind/pull/128)
- Applied latest design to buttons [#127](https://github.com/envoy/polarwind/pull/127)

### Documentation

- Added more types of links in the example to illustrate the various handling in embedded
  mode [#120](https://github.com/envoy/polarwind/pull/120)

## 1.0.0 - 2020-05-16

- Initial release 🎉

### New components

- Added a new Link component ([#97](https://github.com/envoy/polarwind/pull/97))

### Enhancements

- Match the latest badge designs ([#98](https://github.com/envoy/polarwind/pull/98))
- Add an `external` prop to `Link` to open external links in another tab/window
  ([#99](https://github.com/envoy/polarwind/pull/99))
- Send a `navigation` event to the parent if clicking a link that is prefixed with the
  origin. The parent will need to set up a handler to handle the message to do the
  appropriate thing like transitioning to another route
  ([#99](https://github.com/envoy/polarwind/pull/99))
- Buttons now support a `url` prop ([#105](https://github.com/envoy/polarwind/pull/105))
- Link now supports an `onClick` callback
  ([#106](https://github.com/envoy/polarwind/pull/106))
- When embedded, link will now automatically pop out an external site. This frees up the
  `external` prop to allow you to force a link to open in a new window even if the URL is
  for the iframe host or internal. ([#106](https://github.com/envoy/polarwind/pull/106))

### Bug fixes

- Fixed the subcomponent generator to add spaces around the `import` member when importing
  a subcomponent into the parent component
  ([#97](https://github.com/envoy/polarwind/pull/97))

## 1.0.0-alpha.4 - 2020-05-13

- Initial alpha release
