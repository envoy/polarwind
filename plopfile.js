module.exports = function (plop) {
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
};
