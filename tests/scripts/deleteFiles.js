"use strict";

const fs = require("fs");
const path = require("path");

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

module.exports = { deleteFiles: deleteFilesRecursive };
