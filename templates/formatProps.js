"use strict";

/**
 * @typedef {Object} FormattedProps
 * @property {string} declarationProps
 * @property {string} firstLineProps
 * @property {boolean} hasProps
 * @property {string} propsType
 */

/**
 * @param {string} componentName
 * @param {import('../createComponent').ComponentPropsOptions} props
 * @param {"js" | "ts"} extension
 * @returns {FormattedProps} FormattedProps
 */
function formatProps(
  componentName,
  { destructure, booleanProps, numberProps, stringProps, unknownProps },
  extension
) {
  const allPropsArray = Object.values([
    ...booleanProps,
    ...numberProps,
    ...stringProps,
    ...unknownProps
  ]).flat();
  const hasProps = allPropsArray.length > 0;
  const propsValues = hasProps && allPropsArray.join(", ").replace(/\?/g, "");

  let declarationProps;
  let firstLineProps;
  let propsType = "";
  if (extension === "js") {
    declarationProps = destructure ? `{ ${ propsValues } }` : "props";
    firstLineProps = !destructure ? `const { ${ propsValues } } = props;

  ` : "";
  } else {
    const propsTypeName = `${ componentName }Props`;
    propsType = hasProps ? `
type ${ propsTypeName } = {
  ${ booleanProps.map(prop => `${ prop }: boolean;`).join("\n  ") }
  ${ numberProps.map(prop => `${ prop }: number;`).join("\n  ") }
  ${ stringProps.map(prop => `${ prop }: string;`).join("\n  ") }
  ${ unknownProps.map(prop => `${ prop }: unknown;`).join("\n  ") }
}
` : "";
    declarationProps = `${ destructure ? `{ ${ propsValues } }` : "props" }: ${ propsTypeName }`;
    firstLineProps = !destructure ? `const { ${ propsValues } } = props;

  ` : "";
  }

  return {
    declarationProps,
    firstLineProps,
    hasProps,
    propsType
  };
}

module.exports = {
  formatProps
};
