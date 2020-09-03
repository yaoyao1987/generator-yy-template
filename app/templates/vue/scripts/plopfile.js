/* eslint-disable  import/no-extraneous-dependencies */
const plop = require("plop");
const path = require("path");

module.exports = function(plop) {
  plop.setGenerator("component", {
    description: "创建一个新组件",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "请输入组件名称（多个单词以中横线命名）",
      },
      { type: "input", name: "CN", message: "请输入组件中文名称" },
      { type: "input", name: "description", message: "请输入组件描述" },
    ],
    actions: [
      {
        type: "add",
        path: path.resolve(
          __dirname,
          "../src/components/{{kebabCase name}}/index.vue"
        ),
        templateFile: path.resolve(
          __dirname,
          "../templates/component/index.hbs"
        ),
      },
      {
        type: "add",
        path: path.resolve(
          __dirname,
          "../src/components/{{kebabCase name}}/__tests__/{{kebabCase name}}.spec.js"
        ),
        templateFile: path.resolve(
          __dirname,
          "../templates/component/__tests__/index.test.hbs"
        ),
      }
    ],
  });
};
