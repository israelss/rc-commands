"use strict";

const fs = require("fs");
const { createComponent } = require("../../../createComponent");
const { COMPONENT_PATH, deleteFiles } = require("../../scripts/testSetup");

const EXTENSION = "ts";

describe("TS Components creation with props", () => {
  describe("with destructuring", () => {
    beforeAll(() => {
      deleteFiles();

      const componentOptions = {
        extension: EXTENSION,
        styles: {
          create: true,
          type: "css",
        },
        props: {
          destructure: true,
          booleanProps: ["booleanProp1", "booleanProp2?"],
          numberProps: ["numberProp1", "numberProp2?"],
          stringProps: ["stringProp1", "stringProp2?"],
          unknownProps: ["unknownProp1", "unknownProp2?"],
        }
      };

      createComponent(COMPONENT_PATH, componentOptions);
    });

    test("create files with correct content", () => {
      const expectedGeneratedTsxFile = `import React from "react";
import "./TestComponent.css";

type TestComponentProps = {
  booleanProp1: boolean;
  booleanProp2?: boolean;
  numberProp1: number;
  numberProp2?: number;
  stringProp1: string;
  stringProp2?: string;
  unknownProp1: unknown;
  unknownProp2?: unknown;
}

export default function TestComponent({ booleanProp1, booleanProp2, numberProp1, numberProp2, stringProp1, stringProp2, unknownProp1, unknownProp2 }: TestComponentProps) {
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

  describe("without destructuring", () => {
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
          booleanProps: ["booleanProp1", "booleanProp2?"],
          numberProps: ["numberProp1", "numberProp2?"],
          stringProps: ["stringProp1", "stringProp2?"],
          unknownProps: ["unknownProp1", "unknownProp2?"],
        }
      };

      createComponent(COMPONENT_PATH, componentOptions);
    });

    test("create files with correct content", () => {
      const expectedGeneratedtsxFile = `import React from "react";
import "./TestComponent.css";

type TestComponentProps = {
  booleanProp1: boolean;
  booleanProp2?: boolean;
  numberProp1: number;
  numberProp2?: number;
  stringProp1: string;
  stringProp2?: string;
  unknownProp1: unknown;
  unknownProp2?: unknown;
}

export default function TestComponent(props: TestComponentProps) {
  const { booleanProp1, booleanProp2, numberProp1, numberProp2, stringProp1, stringProp2, unknownProp1, unknownProp2 } = props;

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
      expect(generatedTsxFile).toBe(expectedGeneratedtsxFile);
    });
  });
});

