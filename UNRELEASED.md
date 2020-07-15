# Unreleased changes

### Breaking changes

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

### Documentation

### Development workflow

### Dependency upgrades

### Code quality

### Deprecations
