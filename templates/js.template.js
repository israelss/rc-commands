"use strict";

const { formatProps } = require("./formatProps");
const { formatStyleImport } = require("./formatStyleImport");

/**
 * @param {string} componentName
 * @param {import('../createComponent').ComponentPropsOptions} props
 * @param {import('../createComponent').StyleType | false} styleType
 */
function jsTemplate(componentName, props, styleType) {
  const {
    declarationProps,
    firstLineProps,
    hasProps
  } = formatProps(componentName, props, "js");
  const styleImport = formatStyleImport(componentName, styleType);

  return {
    component: `import React from "react";
${ styleImport }
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
  jsTemplate
};
