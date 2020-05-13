# Development guide

## General principles

1. Be conscious about where we place dependencies. Ask yourself these questions:

   - Is it needed directly by the component during runtime? If so, add it as a
     dependency.
   - Is it needed during development and testing? If so, add it as a development
     dependency. This includes all things Babel/PostCSS.
   - Do we require certain libraries are present in a host app? If so, add it as a peer
     dependency. This will probably only be React.

2. In the early days, we're careful to provide specific settings to `tailwind.config.js`.
   Most things will be set as a theme by setting the `theme` keys directly, instead of
   using `extend`. In the end, it doesn't really matter because unused styles get removed
   by PurgeCSS anyway.

## Recommended setup

1. Use vscode.

2. Install the recommended vscode extensions

   - Tailwind CSS IntelliSense: Tailwind CSS class name completion
   - ESLint: Integrates ESLint JavaScript into VS Code
   - stylelint: eslint but for CSS. vscode's default css linter warns on modern CSS
   - Auto Import - ES6, TS, JSX, TSX: Automatically finds, parses and provides code
     actions and code completion for all available imports. Works with JavaScript and
     TypeScript.
   - CSS Modules: Visual Studio Code extension for CSS Modules
   - Prettier - Code formatter: Code formatter using prettier
   - Rewrap: Re-wraps comments and other text to a given line length
