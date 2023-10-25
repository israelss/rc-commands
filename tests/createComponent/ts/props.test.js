"use strict";

const fs = require("fs");
const { createComponent } = require("../../../createComponent");
const { COMPONENT_PATH, deleteFiles } = require("../../scripts/testSetup");

const EXTENSION = "ts";

describe("TS Components creation with props", () => {
  describe("with few props", () => {
    beforeAll(() => {
      deleteFiles();

      const componentOptions = {
        extension: EXTENSION,
        styles: {
          create: false,
          type: "css",
        },
        props: {
          destructure: true,
          booleanProps: ["booleanProp1"],
          numberProps: [],
          stringProps: [],
          unknownProps: [],
          functionProps: [],
        }
      };

      createComponent(COMPONENT_PATH, componentOptions);
    });

    test("create files with correct content", () => {
      const expectedGeneratedTsxFile = `import React from "react";

type TestComponentProps = {
  booleanProp1: boolean;
}

export default function TestComponent({ booleanProp1 }: TestComponentProps) {
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
  describe("with many props", () => {
    beforeAll(() => {
      deleteFiles();

      const componentOptions = {
        extension: EXTENSION,
        styles: {
          create: false,
          type: "css",
        },
        props: {
          destructure: true,
          booleanProps: ["booleanProp1", "booleanProp2?"],
          numberProps: ["numberProp1", "numberProp2?"],
          stringProps: ["stringProp1", "stringProp2?"],
          unknownProps: ["unknownProp1", "unknownProp2?"],
          functionProps: [
            "functionProp1:set(Rec<s, n>)",
            "functionProp2:set(b)?",
            "functionProp3:(arg1:s)=>void"
          ],
        }
      };

      createComponent(COMPONENT_PATH, componentOptions);
    });

    test("create files with correct content", () => {
      const expectedGeneratedTsxFile = `import React from "react";

type TestComponentProps = {
  booleanProp1: boolean;
  booleanProp2?: boolean;
  numberProp1: number;
  numberProp2?: number;
  stringProp1: string;
  stringProp2?: string;
  unknownProp1: unknown;
  unknownProp2?: unknown;
  functionProp1: Dispatch<SetStateAction<Record<string, number>>>;
  functionProp2: Dispatch<SetStateAction<boolean>>;
  functionProp3: (arg1: string) => void;
}

export default function TestComponent({
  booleanProp1,
  booleanProp2,
  numberProp1,
  numberProp2,
  stringProp1,
  stringProp2,
  unknownProp1,
  unknownProp2,
  functionProp1,
  functionProp2,
  functionProp3,
}: TestComponentProps) {
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
  describe("with primitives props", () => {
    beforeAll(() => {
      deleteFiles();

      const componentOptions = {
        extension: EXTENSION,
        styles: {
          create: false,
          type: "css",
        },
        props: {
          destructure: true,
          booleanProps: ["booleanProp1", "booleanProp2?"],
          numberProps: ["numberProp1", "numberProp2?"],
          stringProps: ["stringProp1", "stringProp2?"],
          unknownProps: ["unknownProp1", "unknownProp2?"],
          functionProps: [],
        }
      };

      createComponent(COMPONENT_PATH, componentOptions);
    });

    test("create files with correct content", () => {
      const expectedGeneratedTsxFile = `import React from "react";

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

export default function TestComponent({
  booleanProp1,
  booleanProp2,
  numberProp1,
  numberProp2,
  stringProp1,
  stringProp2,
  unknownProp1,
  unknownProp2,
}: TestComponentProps) {
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
  describe("with function props", () => {
    beforeAll(() => {
      deleteFiles();

      const componentOptions = {
        extension: EXTENSION,
        styles: {
          create: false,
          type: "css",
        },
        props: {
          destructure: true,
          booleanProps: [],
          numberProps: [],
          stringProps: [],
          unknownProps: [],
          functionProps: [
            "functionProp1:set(Rec<s, n>)",
            "functionProp2:set(b)?",
            "functionProp3:(arg1:s)=>void"
          ],
        }
      };

      createComponent(COMPONENT_PATH, componentOptions);
    });

    test("create files with correct content", () => {
      const expectedGeneratedTsxFile = `import React from "react";

type TestComponentProps = {
  functionProp1: Dispatch<SetStateAction<Record<string, number>>>;
  functionProp2: Dispatch<SetStateAction<boolean>>;
  functionProp3: (arg1: string) => void;
}

export default function TestComponent({
  functionProp1,
  functionProp2,
  functionProp3,
}: TestComponentProps) {
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
          functionProps: [
            "functionProp1:set(Rec<s, b>)",
            "functionProp2:set(Rec<n, u>)",
            "functionProp3:set(b)?",
            "functionProp4:set(n)?",
            "functionProp5:set(s)?",
            "functionProp6:set(u)?",
            "functionProp7:(arg1:b)=>void",
            "functionProp8:(arg1:n)=>void",
            "functionProp9:(arg1:s)=>void",
            "functionProp10:(arg1:u)=>void",
          ],
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
  functionProp1: Dispatch<SetStateAction<Record<string, boolean>>>;
  functionProp2: Dispatch<SetStateAction<Record<number, unknown>>>;
  functionProp3: Dispatch<SetStateAction<boolean>>;
  functionProp4: Dispatch<SetStateAction<number>>;
  functionProp5: Dispatch<SetStateAction<string>>;
  functionProp6: Dispatch<SetStateAction<unknown>>;
  functionProp7: (arg1: boolean) => void;
  functionProp8: (arg1: number) => void;
  functionProp9: (arg1: string) => void;
  functionProp10: (arg1: unknown) => void;
}

export default function TestComponent({
  booleanProp1,
  booleanProp2,
  numberProp1,
  numberProp2,
  stringProp1,
  stringProp2,
  unknownProp1,
  unknownProp2,
  functionProp1,
  functionProp2,
  functionProp3,
  functionProp4,
  functionProp5,
  functionProp6,
  functionProp7,
  functionProp8,
  functionProp9,
  functionProp10,
}: TestComponentProps) {
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
          functionProps: [
            "functionProp1:set(Rec<s, b>)",
            "functionProp2:set(Rec<n, u>)",
            "functionProp3:set(b)?",
            "functionProp4:set(n)?",
            "functionProp5:set(s)?",
            "functionProp6:set(u)?",
            "functionProp7:(arg1:b)=>void",
            "functionProp8:(arg1:n)=>void",
            "functionProp9:(arg1:s)=>void",
            "functionProp10:(arg1:u)=>void",
          ],
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
  functionProp1: Dispatch<SetStateAction<Record<string, boolean>>>;
  functionProp2: Dispatch<SetStateAction<Record<number, unknown>>>;
  functionProp3: Dispatch<SetStateAction<boolean>>;
  functionProp4: Dispatch<SetStateAction<number>>;
  functionProp5: Dispatch<SetStateAction<string>>;
  functionProp6: Dispatch<SetStateAction<unknown>>;
  functionProp7: (arg1: boolean) => void;
  functionProp8: (arg1: number) => void;
  functionProp9: (arg1: string) => void;
  functionProp10: (arg1: unknown) => void;
}

export default function TestComponent(props: TestComponentProps) {
  const {
    booleanProp1,
    booleanProp2,
    numberProp1,
    numberProp2,
    stringProp1,
    stringProp2,
    unknownProp1,
    unknownProp2,
    functionProp1,
    functionProp2,
    functionProp3,
    functionProp4,
    functionProp5,
    functionProp6,
    functionProp7,
    functionProp8,
    functionProp9,
    functionProp10,
  } = props;

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

