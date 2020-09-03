var Generator = require("yeoman-generator");
const fs = require("fs");
const commandExists = require("command-exists").sync;
const chalk = require("chalk");

chalk.enabled = true;
chalk.level = 1;

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }
  async prompting() {
    this.answers = await this.prompt([
      {
        type: "list",
        name: "framework",
        message: "请选择框架",
        choices: [
          {
            name: "Vue",
            value: "vue",
          },
          {
            name: "React",
            value: "react",
          },
        ],
      },
      {
        type: "list",
        name: "template",
        message: "请选择模板类型",
        choices: [
          {
            name: "Page",
            value: "page",
          },
          {
            name: "Component",
            value: "component",
          },
        ],
      },
      {
        type: "confirm",
        name: "typescript",
        message: "是否使用Typescript?",
      },
    ]);
    console.log(chalk.green("Welcome to use generator-yy-template"));
    console.log(chalk.bgGray("answer the questions to init project"));
  }
  writing() {
    console.log(chalk.green("start creating"));

    const answer = this.answers;

    const prefix = answer.typescript ? "ts-" : "";
    const template = prefix + answer.framework;

    this.fs.copy(this.templatePath(template), this.destinationPath("./"), {
      title: answer.framework,
    });

    const pkgJson = require(`./${prefix}package.json`);

    this.fs.extendJSON(this.destinationPath("./package.json"), pkgJson);
  }
  install() {
    const hasYarn = commandExists("yarn");
    console.log("hasYarn", hasYarn);
    this.installDependencies({
      npm: !hasYarn,
      yarn: hasYarn,
      bower: false
    });
  }
};
