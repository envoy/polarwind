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
1. When the PR is merged, create a git tag similar in form to `v1.7.0`. Push the tag to
   remote.
1. Create a release on GitHub with the tag as the title. The content of the release should
   be the entries from `CHANGELOG.md` for that version.
