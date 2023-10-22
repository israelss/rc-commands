#!/usr/bin/env node

"use strict";

const { Command } = require("commander");
const { createComponent } = require("./createComponent");

const program = new Command("rc-commands");

program.version("0.0.4");

/**
 *
 * @param {string} commandName
 * @param {string} description
 * @param {string[]} aliases
 * @param {"js" | "ts"} extension
 * @returns void
 */
function createComponentCommand(commandName, description, aliases, extension) {
  const command = program.command(commandName);
  
  if (aliases && aliases.length > 0) {
    aliases.forEach((alias) => command.alias(alias));
  }

  command
    .description(description)
    .option("--no-styles", "Skip creation of style file")
    .option("--less","Choose less as style file")
    .option("--sass", "Choose sass as style file")
    .option("--destructureProps", "Should destructure props on Component declaration")
    .option("-b <booleanProps...>", "Boolean props to include. Optional props should have a '?' at the end", [])
    .option("-n <numberProps...>", "Number props to include. Optional props should have a '?' at the end", [])
    .option("-s <stringProps...>", "String props to include. Optional props should have a '?' at the end", [])
    .option("-u <unknownProps...>", "Unknown props to include. Optional props should have a '?' at the end", [])
    .action((componentPath, options) => {
      const styleType = options.less ? "less" : options.sass ? "sass" : "css";
      
      const componentOptions = {
        extension,
        styles: {
          create: options.styles,
          type: styleType,
        },
        props: {
          destructure: options.destructureProps,
          booleanProps: options.b,
          numberProps: options.n,
          stringProps: options.s,
          unknownProps: options.u,
        }
      };
    
      createComponent(componentPath, componentOptions);
    });
}

createComponentCommand("component <[path/to/new/]ComponentName>", "create a component", ["c", "tsc"], "ts");
createComponentCommand("js-component <[path/to/new/]ComponentName>", "create a js component", ["jsc"], "js");

program.parse(process.argv);
