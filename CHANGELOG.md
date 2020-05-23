# Changelog

All notable changes to this project will be documented in this file.

The format is based on [these versioning and changelog guidelines](https://git.io/polaris-changelog-guidelines).

<!-- Unreleased changes should go to UNRELEASED.md -->

---

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
