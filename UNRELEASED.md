# Unreleased changes

### Breaking changes

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

### Documentation

### Development workflow

### Dependency upgrades

### Code quality

### Deprecations
