"use strict";

const { formatProps } = require("./formatProps");
const { formatStyleImport } = require("./formatStyleImport");

/**
 * @param {string} componentName
 * @param {import('../createComponent').ComponentPropsOptions} props
 * @param {import('../createComponent').StyleType | false} styleType
 */
function tsTemplate(componentName, props, styleType) {
  const {
    declarationProps,
    firstLineProps,
    hasProps,
    propsType
  } = formatProps(componentName, props, "ts");
  const styleImport = formatStyleImport(componentName, styleType);

  return {
    component: `import React from "react";
${ styleImport }${ propsType }
export default function ${ componentName }(${ hasProps ? declarationProps : "" }) {
  ${ hasProps ? firstLineProps : "" }return (
    <div>${ componentName }</div>
  );
}`,
    spec: `import React from "react";
import { render } from "@testing-library/react";
import ${ componentName } from "./${ componentName }";

describe('<${ componentName }/>', () => {
  it("should render a div with text '${ componentName }'", () => {
    const { getByText } = render(<${ componentName } />);
    const divElement = getByText(/${ componentName }/i);
    expect(divElement).toBeInTheDocument();
  });
});`
  };
}

module.exports = {
  tsTemplate
};
