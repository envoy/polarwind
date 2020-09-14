# Publishing a package to npm

## Publishing a stable version

1. Add a new header to `CHANGELOG.md` with the version number and current date.
1. Copy entries in `UNRELEASED.md` to `CHANGELOG.md`, skipping over sections with no
   entries.
1. Reset `UNRELEASED.md` to its pristine state containing just headers.
1. Bump the version number in `package.json` to the new version number.
1. Update the version number in `README.md` where we refer to the CSS file on unpkg.com.
   There are 2 instances of it here.
1. Update the version number for `@envoy/polarwind` in
   `examples/django/frontend/package.json` to the new version number, but don't run yarn
   install (there is no entry in `package.lock` on purpose)
1. Update the version number for `@envoy/polarwind` in
   `examples/create-react-app/package.json` to the new version number, but don't run yarn
   install (there is no entry in `package.lock` on purpose)
1. Create a PR containing all the above.
1. When the PR is merged, run `yarn publish`. It will prompt you to set a new version,
   just skip this since we have already updated the version number in `package.json`.
1. Create a git tag of the form `v1.x.x`. Push the tag to remote with `git push origin --tags`.
1. Create a release on GitHub by going to https://github.com/envoy/polarwind/tags. Select
   "Create release" from the action button next to the tag. Fill in the content of the
   release with the entries from `CHANGELOG.md`.
