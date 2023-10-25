"use strict";

const EMPTY_LINE_REGEX = /^\s*\n*$/;
const FUNCTION_REGEX = /(?:\()(?<args>.*)*\)(?:=>)(?<returnType>.*)/;
const PROPS_TYPES_REGEX = /(?<line>.*)|(?:\.*\n{1}\s*)/gm;
const SET_STATE_REC_REGEX = /(?:Rec)(?:<)((?<keyType>[bnsu])(?:,\s)(?<valueType>[bnsu]))(?:>)/;
const TYPES_MAP = new Map([
  ["b", "boolean"],
  ["n", "number"],
  ["s", "string"],
  ["u", "unknown"],
]);
const MAX_SAME_LINE_PROPS_LENGTH = 40;

/**
 * @param {string} propsValues
 */
function formatPropValues(propsValues) {
  if (!propsValues) return "";

  if (propsValues.length < MAX_SAME_LINE_PROPS_LENGTH) return ` ${ propsValues } `;

  return `
   ${ propsValues.replace(/, /g , ",\n    ") },
  `;
}

/**
 * @param {string} arg
 */
function formatFunctionArgWithType(arg) {
  const [argName, argType] = arg.split(":");

  return `${ argName }: ${ TYPES_MAP.get(argType) }`;
}

/**
 * @param {string} args
 */
function formatFunctionArgs(args) {
  const argsList = args.split(",");

  return argsList.map(formatFunctionArgWithType);
}

/**
 * @param {string} prop
 */
function formatFunctionType(prop) {
  const match = prop.match(FUNCTION_REGEX);
  const { args, returnType } = match.groups;

  return `(${ formatFunctionArgs(args) }) => ${ returnType }`;
}

/**
 * @param {string} prop
 */
function formatSetStatePropWithRecord(prop) {
  const match = prop.match(SET_STATE_REC_REGEX);
  const { keyType, valueType } = match.groups;

  return `Record<${ TYPES_MAP.get(keyType) }, ${ TYPES_MAP.get(valueType) }>`;
}

/**
 * @param {string} prop
 */
function formatSetStateProp(prop) {
  if (prop.startsWith("Rec")) return formatSetStatePropWithRecord(prop);

  return TYPES_MAP.get(prop);
}

/**
 * @param {string} propType
 */
function formatPropType(propType) {
  if (!propType.startsWith("set")) return `${ formatFunctionType(propType) }`;

  const type = propType.split(/set\((.*)\)/)[1];

  return `Dispatch<SetStateAction<${ formatSetStateProp(type) }>>`;
}

/**
 * @param {string[]} props
 */
function formatFunctionProps(props) {
  return props
    .map(prop => {
      const [propName, propType] = prop.split(/:(.*)/);
      const formattedType = formatPropType(propType);

      return `${ propName }: ${ formattedType };`;
    })
    .join("\n  ");
}

/**
 * @param {string[]} props
 * @param {"boolean" | "number" | "string" | "unknown"} type 
 */
function formatPrimitiveProps(props, type) {
  return props.map(prop => `${ prop }: ${ type };`).join("\n  ");
}

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
  { destructure, booleanProps, numberProps, stringProps, unknownProps, functionProps },
  extension
) {
  const allPropsArray = Object.values([
    ...booleanProps,
    ...numberProps,
    ...stringProps,
    ...unknownProps,
    ...functionProps.map(f => f.replace(/:.*/, ""))
  ]);
  const hasProps = allPropsArray.length > 0;
  const propsValues = hasProps && allPropsArray.join(", ").replace(/\?/g, "");

  const formattedPropsValues = formatPropValues(propsValues);
 
  const firstLineProps = !destructure ? `const {${ formattedPropsValues.replace(/^\s/, "\n ") }} = props;

  ` : "";

  let declarationProps = destructure
    ? `{${ formattedPropsValues.replace(/^\s{2}/, "\n").replace(/^\s{4}/gm, "  ").replace(/\s{2}$/, "") }}`
    : "props";

  let propsType = "";

  if (extension === "ts") {
    const propsTypeName = `${ componentName }Props`;

    declarationProps = `${ declarationProps }: ${ propsTypeName }`;

    propsType = hasProps ? `
type ${ propsTypeName } = {
  ${ formatPrimitiveProps(booleanProps, "boolean") }
  ${ formatPrimitiveProps(numberProps, "number") }
  ${ formatPrimitiveProps(stringProps, "string") }
  ${ formatPrimitiveProps(unknownProps, "unknown") }
  ${ formatFunctionProps(functionProps) }
}
` : "";
    const matches = propsType.match(PROPS_TYPES_REGEX);
    console.log({ matches });
    propsType = `
${
  matches
    .filter(line => !line.match(EMPTY_LINE_REGEX))
    .join("\n")
    .replace(/\s{2}$/, "")
}
`;
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
