# Unreleased changes

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

### Documentation

### Development workflow

### Dependency upgrades

### Code quality

### Deprecations
