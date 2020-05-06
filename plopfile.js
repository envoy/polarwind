const path = require("path");
const dedent = require("dedent");
const glob = require("glob");

module.exports = function (plop) {
  plop.setPrompt("search-list", require("inquirer-search-list"));

  plop.setGenerator("component", {
    description: "A typical component",
    prompts: [
      {
        type: "input",
        name: "name",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/components/{{properCase name}}/{{properCase name}}.js",
        templateFile: "plop-templates/component/Component.js.hbs",
      },
      {
        type: "add",
        path: "src/components/{{properCase name}}/index.js",
        templateFile: "plop-templates/component/index.js.hbs",
      },
      {
        type: "add",
        path:
          "src/components/{{properCase name}}/{{properCase name}}.module.css",
        templateFile: "plop-templates/component/Component.module.css.hbs",
      },
      {
        type: "add",
        path:
          "src/components/{{properCase name}}/{{properCase name}}.stories.mdx",
        templateFile: "plop-templates/component/Component.stories.mdx.hbs",
      },
      {
        type: "append",
        path: "src/components/index.js",
        template:
          'export { {{properCase name }} } from "./{{properCase name}}";',
      },
    ],
  });

  plop.setGenerator("subcomponent", {
    prompts: [
      {
        type: "input",
        name: "name",
      },
      {
        type: "search-list",
        name: "parent",
        message: "Choose the parent component",
        choices: () =>
          glob.sync("src/components/*/").map((p) => path.basename(p)),
      },
    ],
    actions: [
      {
        type: "add",
        path:
          "src/components/{{parent}}/components/{{properCase name}}/{{properCase name}}.js",
        templateFile: "plop-templates/component/Component.js.hbs",
      },
      {
        type: "add",
        path:
          "src/components/{{parent}}/components/{{properCase name}}/index.js",
        templateFile: "plop-templates/component/index.js.hbs",
      },
      {
        type: "append",
        path: "src/components/{{parent}}/components/index.js",
        template:
          'export { {{properCase name }} } from "./{{properCase name}}";',
      },
      {
        type: "append",
        path: "src/components/{{parent}}/{{parent}}.module.css",
        template: dedent`
          .{{properCase name}} {
            @apply utilityClass;
          }
        `,
      },
      {
        type: "append",
        path: "src/components/{{parent}}/{{parent}}.js",
        template: dedent`
          import { {{~properCase name~}} } from "./components";
          {{parent}}.{{properCase name}} = {{properCase name}};
        `,
      },
    ],
  });
};
