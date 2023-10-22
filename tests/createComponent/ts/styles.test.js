"use strict";

const fs = require("fs");
const { createComponent } = require("../../../createComponent");
const { COMPONENT_PATH, deleteFiles } = require("../../scripts/testSetup");

const EXTENSION = "ts";

describe("TS Components creation", () => {
  describe("with default styles", () => {
    beforeAll(() => {
      deleteFiles();

      const componentOptions = {
        extension: EXTENSION,
        styles: {
          create: true,
          type: "css",
        },
        props: {
          destructure: false,
          booleanProps: [],
          numberProps: [],
          stringProps: [],
          unknownProps: [],
        }
      };
   
      createComponent(COMPONENT_PATH, componentOptions);
    });

    test("create files with correct content", () => {
      const expectedGeneratedTsxFile = `import React from "react";
import "./TestComponent.css";

export default function TestComponent() {
  return (
    <div>TestComponent</div>
  );
}`;
      const expectedGeneratedSpecFile = `import React from "react";
import { render } from "@testing-library/react";
import TestComponent from "./TestComponent";

describe('<TestComponent/>', () => {
  it("should render a div with text 'TestComponent'", () => {
    const { getByText } = render(<TestComponent />);
    const divElement = getByText(/TestComponent/i);
    expect(divElement).toBeInTheDocument();
  });
});`;

      const generatedSpecFile = fs.readFileSync(`${ COMPONENT_PATH }/TestComponent.spec.tsx`, "utf8");
      expect(generatedSpecFile).toBe(expectedGeneratedSpecFile);

      const generatedTsxFile = fs.readFileSync(`${ COMPONENT_PATH }/TestComponent.tsx`, "utf8");
      expect(generatedTsxFile).toBe(expectedGeneratedTsxFile);
    });
  });

  describe("without styles", () => {
    beforeAll(() => {
      deleteFiles();

      const componentOptions = {
        extension: EXTENSION,
        styles: {
          create: false,
          type: "css",
        },
        props: {
          destructure: false,
          booleanProps: [],
          numberProps: [],
          stringProps: [],
          unknownProps: [],
        }
      };
    
      createComponent(COMPONENT_PATH, componentOptions);
    });

    test("create files with correct content", () => {
      const expectedGeneratedTsxFile = `import React from "react";

export default function TestComponent() {
  return (
    <div>TestComponent</div>
  );
}`;
      const expectedGeneratedSpecFile = `import React from "react";
import { render } from "@testing-library/react";
import TestComponent from "./TestComponent";

describe('<TestComponent/>', () => {
  it("should render a div with text 'TestComponent'", () => {
    const { getByText } = render(<TestComponent />);
    const divElement = getByText(/TestComponent/i);
    expect(divElement).toBeInTheDocument();
  });
});`;

      const generatedSpecFile = fs.readFileSync(`${ COMPONENT_PATH }/TestComponent.spec.tsx`, "utf8");
      expect(generatedSpecFile).toBe(expectedGeneratedSpecFile);

      const generatedTsxFile = fs.readFileSync(`${ COMPONENT_PATH }/TestComponent.tsx`, "utf8");
      expect(generatedTsxFile).toBe(expectedGeneratedTsxFile);
    });
  });
});
