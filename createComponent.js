"use strict";

const fs = require("fs");

const path = require("path");

const kleur = require("kleur");

const { jsTemplate, tsTemplate } = require("./templates");

/**
 * @typedef {"css" | "sass" | "less"} StyleType
 */

/**
 * @typedef {Object} ComponentStyleOptions
 * @property {boolean} create
 * @property {StyleType} type
 */

/**
 * @typedef {Object} ComponentPropsOptions
 * @property {boolean} destructure
 * @property {string[]} booleanProps
 * @property {string[]} numberProps
 * @property {string[]} stringProps
 * @property {string[]} unknownProps
 * @property {string[]} functionProps
 */

/**
 * @typedef {Object} ComponentOptions
 * @property {"js" | "ts"} extension
 * @property {ComponentStyleOptions} styles
 * @property {ComponentPropsOptions} props
 */

/**
 *
 * Creates a component file as `componentName`.`type`
 * Creates a test for the created component
 * Creates a style file if `createStyles` is true
 *
 * @param {string} componentPath
 * @param {ComponentOptions} componentOptions
 * @returns void
 */
function createComponent(componentPath, componentOptions) {
  try {
    const folder = componentPath;

    const componentName = path.basename(componentPath).charAt(0).toUpperCase() + path.basename(componentPath).slice(1);

    const {
      extension,
      props,
      styles: { create: createStyles, type: styleType }
    } = componentOptions;

    const templates = {
      ts: tsTemplate(componentName, props, createStyles && styleType),
      js: jsTemplate(componentName, props, createStyles && styleType),
    };

    const files = [
      { name: `${ componentName }.${ extension === "ts" ? "tsx" : "jsx" }`, content: templates[extension].component },
      { name: `${ componentName }.spec.${ extension === "ts" ? "tsx" : "jsx" }`, content: templates[extension].spec },
    ];

    if (createStyles) {
      files.push({ name: `${ componentName }.${ styleType }`, content: "" });
    }

    fs.mkdirSync(folder, { recursive: true });

    files.forEach((file) => {
      const filePath = path.join(folder, file.name);

      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, file.content);
        console.log(kleur.blue().bold(`✅ File ${ kleur.green().bold(file.name) } created successfully!`));
      } else {
        console.log(kleur.yellow().bold(`🚨 File ${ kleur.blue().bold(file.name) } already exists, skipping...`));
      }
    });

    console.log(`\n${ kleur.bgBlue().bold().white(" Folder and files created successfully! 🚀🚀🚀 ") }`);
  } catch (error) {
    console.error(kleur.red().bold().underline(`Something went wrong: ${ error }`));
  }
}

module.exports = {
  createComponent
};
