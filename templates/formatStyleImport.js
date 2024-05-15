"use strict";

/**
 * @param {string} componentName
 * @param {import('../createComponent').StyleType | false} styleType
 */
function formatStyleImport(componentName, styleType) {
  return styleType ? `import "./${ componentName }.${ styleType }";
` : "";
}

module.exports = {
  formatStyleImport
};
