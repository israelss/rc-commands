"use strict";

const fs = require("fs");
const kleur = require("kleur");
const path = require("path");

const DEFAULT_PATH = "tests/path";
const COMPONENT_PATH = `${ DEFAULT_PATH }/testComponent`;

function deleteFilesRecursive(directory) {
  if (fs.existsSync(directory)) {
    fs.readdirSync(directory).forEach((file) => {
      const currentPath = path.join(directory, file);

      if (fs.lstatSync(currentPath).isDirectory()) {
        deleteFilesRecursive(currentPath);
      } else {
        fs.unlinkSync(currentPath);
      }
    });

    fs.rmdirSync(directory);
  }
}

function deleteFiles()  {
  console.log(kleur.bgRed().bold().white(" 🔥 Deleting test files and folders 🔥 "));
  deleteFilesRecursive(DEFAULT_PATH); 
}

module.exports = { DEFAULT_PATH, COMPONENT_PATH, deleteFiles };
