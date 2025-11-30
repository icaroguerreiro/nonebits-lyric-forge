export default function (plop) {
  plop.setGenerator("component", {
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Component Name:",
      },
      {
        type: "list",
        name: "type",
        message: "Component Type:",
        choices: ["common", "layout", "ui"],
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/components/{{pascalCase type}}/{{pascalCase name}}/index.tsx",
        templateFile: "plop-templates/components/index.tsx.hbs",
      },
      {
        type: "add",
        path: "src/components/{{pascalCase type}}/{{pascalCase name}}/style.module.scss",
        templateFile: "plop-templates/components/style.module.scss.hbs",
      },
    ],
  });
  plop.setGenerator("page", {
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Page Name:",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/pages/{{pascalCase name}}/index.tsx",
        templateFile: "plop-templates/components/index.tsx.hbs",
      },
      {
        type: "add",
        path: "src/pages/{{pascalCase name}}/style.module.scss",
        templateFile: "plop-templates/components/style.module.scss.hbs",
      },
    ],
  });
}
