# Unreleased changes

### Breaking changes

- Removed `UnstyledLink` from the list of components we export. It's an internal component
  not meant to be used by consumers of the library
  [#122](https://github.com/envoy/polarwind/pull/122)
- Removed Labeled from being exported [#128](https://github.com/envoy/polarwind/pull/128)

### New components

### Enhancements

- Tab options now support a `url` key for tabs that link out to another page [#122](https://github.com/envoy/polarwind/pull/122)
- Tabs now have a hover state [#129](https://github.com/envoy/polarwind/pull/129)
- Updated input fields to match current design [#128](https://github.com/envoy/polarwind/pull/128)
- Added read-only support to Toggle [#128](https://github.com/envoy/polarwind/pull/128)
- Added an outline brand Button variation [#127](https://github.com/envoy/polarwind/pull/127)

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

### Development workflow

### Dependency upgrades

### Code quality

### Deprecations
