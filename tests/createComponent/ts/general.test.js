"use strict";

const fs = require("fs");
const { createComponent } = require("../../../createComponent");
const { COMPONENT_PATH, deleteFiles } = require("../../scripts/testSetup");

const EXTENSION = "ts";

describe("TS Components creation", () => {
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
        functionProps: [],
      }
    };
   
    createComponent(COMPONENT_PATH, componentOptions);
  });

  test("generate path correctly", () => {
    expect(fs.existsSync(COMPONENT_PATH)).toBeTruthy();
  });

  test("create all files", () => {
    const tsxSpecFileExists = fs.existsSync(`${ COMPONENT_PATH }/TestComponent.spec.tsx`);
    expect(tsxSpecFileExists).toBeTruthy();

    const tsxFileExists = fs.existsSync(`${ COMPONENT_PATH }/TestComponent.tsx`);
    expect(tsxFileExists).toBeTruthy();

    const styleFileExists = fs.existsSync(`${ COMPONENT_PATH }/TestComponent.css`);
    expect(styleFileExists).toBeTruthy();
  });
});
