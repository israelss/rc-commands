"use strict";

const fs = require("fs");
const { createComponent } = require("../../../createComponent");
const { COMPONENT_PATH, deleteFiles } = require("../../scripts/testSetup");

const EXTENSION = "js";

describe("JS Components creation with props", () => {
  describe("with few props", () => {
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
      const expectedGeneratedJsxFile = `import React from "react";
import "./TestComponent.css";

export default function TestComponent({ booleanProp1 }) {
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

      const generatedSpecFile = fs.readFileSync(`${ COMPONENT_PATH }/TestComponent.spec.jsx`, "utf8");
      expect(generatedSpecFile).toBe(expectedGeneratedSpecFile);

      const generatedJsxFile = fs.readFileSync(`${ COMPONENT_PATH }/TestComponent.jsx`, "utf8");
      expect(generatedJsxFile).toBe(expectedGeneratedJsxFile);
    });
  });
  describe("with many props", () => {
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
          functionProps: ["functionProp1", "functionProp2?", "functionProp3"],
        }
      };

      createComponent(COMPONENT_PATH, componentOptions);
    });

    test("create files with correct content", () => {
      const expectedGeneratedJsxFile = `import React from "react";
import "./TestComponent.css";

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
}) {
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

      const generatedSpecFile = fs.readFileSync(`${ COMPONENT_PATH }/TestComponent.spec.jsx`, "utf8");
      expect(generatedSpecFile).toBe(expectedGeneratedSpecFile);

      const generatedJsxFile = fs.readFileSync(`${ COMPONENT_PATH }/TestComponent.jsx`, "utf8");
      expect(generatedJsxFile).toBe(expectedGeneratedJsxFile);
    });
  });
  describe("with primitives props", () => {
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
          functionProps: [],
        }
      };

      createComponent(COMPONENT_PATH, componentOptions);
    });

    test("create files with correct content", () => {
      const expectedGeneratedJsxFile = `import React from "react";
import "./TestComponent.css";

export default function TestComponent({
  booleanProp1,
  booleanProp2,
  numberProp1,
  numberProp2,
  stringProp1,
  stringProp2,
  unknownProp1,
  unknownProp2,
}) {
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

      const generatedSpecFile = fs.readFileSync(`${ COMPONENT_PATH }/TestComponent.spec.jsx`, "utf8");
      expect(generatedSpecFile).toBe(expectedGeneratedSpecFile);

      const generatedJsxFile = fs.readFileSync(`${ COMPONENT_PATH }/TestComponent.jsx`, "utf8");
      expect(generatedJsxFile).toBe(expectedGeneratedJsxFile);
    });
  });
  describe("with function props", () => {
    describe("with types", () => {
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
            booleanProps: [],
            numberProps: [],
            stringProps: [],
            unknownProps: [],
            functionProps: ["functionProp1:set(Rec<s, n>)", "functionProp2:set(b)?", "functionProp3:(arg1:s)=>void"],
          }
        };

        createComponent(COMPONENT_PATH, componentOptions);
      });

      test("types should be ignored", () => {
        const expectedGeneratedJsxFile = `import React from "react";
import "./TestComponent.css";

export default function TestComponent({
  functionProp1,
  functionProp2,
  functionProp3,
}) {
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

        const generatedSpecFile = fs.readFileSync(`${ COMPONENT_PATH }/TestComponent.spec.jsx`, "utf8");
        expect(generatedSpecFile).toBe(expectedGeneratedSpecFile);

        const generatedJsxFile = fs.readFileSync(`${ COMPONENT_PATH }/TestComponent.jsx`, "utf8");
        expect(generatedJsxFile).toBe(expectedGeneratedJsxFile);
      }); 
    });
    describe("without types", () => {
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
            booleanProps: [],
            numberProps: [],
            stringProps: [],
            unknownProps: [],
            functionProps: ["functionProp1", "functionProp2?", "functionProp3"],
          }
        };

        createComponent(COMPONENT_PATH, componentOptions);
      });

      test("create files with correct content", () => {
        const expectedGeneratedJsxFile = `import React from "react";
import "./TestComponent.css";

export default function TestComponent({
  functionProp1,
  functionProp2,
  functionProp3,
}) {
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

        const generatedSpecFile = fs.readFileSync(`${ COMPONENT_PATH }/TestComponent.spec.jsx`, "utf8");
        expect(generatedSpecFile).toBe(expectedGeneratedSpecFile);

        const generatedJsxFile = fs.readFileSync(`${ COMPONENT_PATH }/TestComponent.jsx`, "utf8");
        expect(generatedJsxFile).toBe(expectedGeneratedJsxFile);
      });
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
          functionProps: ["functionProp1", "functionProp2?", "functionProp3"],
        }
      };

      createComponent(COMPONENT_PATH, componentOptions);
    });

    test("create files with correct content", () => {
      const expectedGeneratedJsxFile = `import React from "react";
import "./TestComponent.css";

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
}) {
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

      const generatedSpecFile = fs.readFileSync(`${ COMPONENT_PATH }/TestComponent.spec.jsx`, "utf8");
      expect(generatedSpecFile).toBe(expectedGeneratedSpecFile);

      const generatedJsxFile = fs.readFileSync(`${ COMPONENT_PATH }/TestComponent.jsx`, "utf8");
      expect(generatedJsxFile).toBe(expectedGeneratedJsxFile);
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
          functionProps: ["functionProp1", "functionProp2?", "functionProp3"],
        }
      };

      createComponent(COMPONENT_PATH, componentOptions);
    });

    test("create files with correct content", () => {
      const expectedGeneratedJsxFile = `import React from "react";
import "./TestComponent.css";

export default function TestComponent(props) {
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

      const generatedSpecFile = fs.readFileSync(`${ COMPONENT_PATH }/TestComponent.spec.jsx`, "utf8");
      expect(generatedSpecFile).toBe(expectedGeneratedSpecFile);

      const generatedJsxFile = fs.readFileSync(`${ COMPONENT_PATH }/TestComponent.jsx`, "utf8");
      expect(generatedJsxFile).toBe(expectedGeneratedJsxFile);
    });
  });
});

