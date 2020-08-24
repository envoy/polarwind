# Polarwind

Polarwind is a React component library for the Envoy design system.

## App development

## Using the React components

While we do offer a CSS-only version, **we strongly recommend using the React versions of
our components**. It allows for rich, complex components like Tabs and autogrowing
multline TextFields, and will not have as many breaking changes as the CSS-only version.

### Installation

Run the following command using [npm](https://www.npmjs.com/):

```bash
npm install @envoy/polarwind --save
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command instead:

```bash
yarn add @envoy/polarwind
```

### Usage

1. Import the CSS directly into your project if your asset packager supports it:

```js
import "@envoy/polarwind/polarwind.css";
```

Otherwise include the CSS in your HTML. We suggest copying the styles file into your own
project, but you may also use it directly:

```html
<link
  rel="stylesheet"
  href="https://unpkg.com/@envoy/polarwind@1.6.1/polarwind.css"
/>
```

2. Include any of the provided components in your project:

```js
import { AppProvider, Page, Button } from "@envoy/polarwind";
```

3. Tell React to render the element in the DOM:

```js
ReactDOM.render(
  <AppProvider>
    <Page title="Example app">
      <Button onClick={() => alert("Button clicked!")}>Example button</Button>
    </Page>
  </AppProvider>,
  document.querySelector("#app")
);
```

## Using the CSS components

If React doesn't make sense for your application, you can use a CSS-only version of our
components. This includes all the styles you need for every component in the library, but
you'll be responsible for writing the correct markup and updating classes and DOM
attributes in response to user events.

### Usage

1. Include the CSS in your HTML. We suggest copying the styles file into your own project,
   but you may also use it directly:

```html
<link
  rel="stylesheet"
  href="https://unpkg.com/@envoy/polarwind@1.6.1/polarwind.css"
/>
```

2. Include the markup and associated classes in your HTML document:

```html
<button class="Polarwind-Button">Example button</button>
```

## Examples

We have created example applications to document some of the ways you could include
Polarwind in one of your own applications. Each of these examples includes further
documentation on how to install dependencies and run the app:

- [create-react-app
  example](https://github.com/envoy/polarwind/tree/master/examples/create-react-app)

## Development

We use Storybook to create a simple, hot-reloading playground for development on these
components. Run `yarn start` in order to start the Storybook server.

We use generators to build scaffolding for a typical component. Run `yarn generate` to see
the list of generators provided.

### Visual regression testing

[Percy](https://percy.io/) runs for every pull request. Percy is a tool that compares
screenshots for every single component we have in the library.

Percy is not always 100% accurate. Since it uses screenshot comparison, even browser
sub-pixel rendering differences can cause Percy to ask for user confirmation of whether a
change was intended or not. In cases like that, use your best judgement to determine
whether you need to address it or not. This is why the choice to approve something or not
is always manual. While everyone can view changes, only members of the Envoy team an
approve changes.

#### Manual visual regression testing

To start a server for manually viewing the visual regression testing examples, run `yarn storybook`.

## Learning resources

If you're new to React, we recommend you start with the [official React Getting Started
documentation](https://facebook.github.io/react/docs/hello-world.html). As you read
through the topics we suggest you follow along using their [React Hello World CodePen
example](http://codepen.io/gaearon/pen/ZpvBNJ?editors=0010).

Additional resources:

- Online training courses at [reacttraining.com](http://reacttraining.com),
  [buildwithreact.com](http://buildwithreact.com), and
  [reactforbeginners.com](http://reactforbeginners.com).
- The community resources in [Awesome React](https://github.com/enaqx/awesome-react).
- As questions and find answers in the various [React support
  communities](https://facebook.github.io/react/community/support.html).

## License

Source code is under a [custom license](LICENSE.md) based on MIT. The license restricts
Polarwind usage to applications that integrate or interoperate with Envoy software or
services, with additional restrictions for external, stand-alone applications.

## Trivia

Polarwind is a portmanteau of [Polaris](https://polaris.shopify.com) and [Tailwind
CSS](https://tailwindcss.com/).
