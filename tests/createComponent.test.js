"use strict";

const fs = require("fs");
const kleur = require("kleur");
const { createComponent } = require("../createComponent");
const { deleteFiles } = require("./scripts/deleteFiles");

const DEFAULT_PATH = "tests/path";

beforeAll(() => {
  console.log(kleur.bgRed().bold(" 🔥 Deleting test files and folders 🔥 "));
  deleteFiles(DEFAULT_PATH); 
});

test("JS component creation with default styles", () => {
  const componentPath = `${ DEFAULT_PATH }/testComponent1`;

  const fileType = "js";

  const createStyles = true;

  createComponent(componentPath, fileType, createStyles, "css");

  expect(fs.existsSync(componentPath)).toBeTruthy();

  const jsxSpecFileExists = fs.existsSync(`${ componentPath }/TestComponent1.spec.jsx`);
  expect(jsxSpecFileExists).toBeTruthy();

  const jsxFileExists = fs.existsSync(`${ componentPath }/TestComponent1.jsx`);
  expect(jsxFileExists).toBeTruthy();
  
  const styleFileExists = fs.existsSync(`${ componentPath }/TestComponent1.css`);
  expect(styleFileExists).toBeTruthy();
});

test("JS component creation without styles", () => {
  const componentPath = `${ DEFAULT_PATH }/testComponent2`;

  const fileType = "js";

  const createStyles = false;

  createComponent(componentPath, fileType, createStyles);

  expect(fs.existsSync(componentPath)).toBeTruthy();
  
  const jsxSpecFileExists = fs.existsSync(`${ componentPath }/TestComponent2.spec.jsx`);
  expect(jsxSpecFileExists).toBeTruthy();

  const jsxFileExists = fs.existsSync(`${ componentPath }/TestComponent2.jsx`);
  expect(jsxFileExists).toBeTruthy();
  
  const styleFileExists = fs.existsSync(`${ componentPath }/TestComponent2.css`);
  expect(styleFileExists).toBeFalsy();
});

test("TS component creation with default styles", () => {
  const componentPath = `${ DEFAULT_PATH }/testComponent3`;

  const fileType = "ts";

  const createStyles = true;

  createComponent(componentPath, fileType, createStyles, "css");

  expect(fs.existsSync(componentPath)).toBeTruthy();

  const tsxSpecFileExists = fs.existsSync(`${ componentPath }/TestComponent3.spec.tsx`);
  expect(tsxSpecFileExists).toBeTruthy();

  const tsxFileExists = fs.existsSync(`${ componentPath }/TestComponent3.tsx`);
  expect(tsxFileExists).toBeTruthy();
  
  const styleFileExists = fs.existsSync(`${ componentPath }/TestComponent3.css`);
  expect(styleFileExists).toBeTruthy();

});

test("TS component creation without styles", () => {
  const componentPath = `${ DEFAULT_PATH }/testComponent4`;

  const fileType = "ts";

  const createStyles = false;

  createComponent(componentPath, fileType, createStyles);

  expect(fs.existsSync(componentPath)).toBeTruthy();

  const tsxSpecFileExists = fs.existsSync(`${ componentPath }/TestComponent4.spec.tsx`);
  expect(tsxSpecFileExists).toBeTruthy();

  const tsxFileExists = fs.existsSync(`${ componentPath }/TestComponent4.tsx`);
  expect(tsxFileExists).toBeTruthy();

  const styleFileExists = fs.existsSync(`${ componentPath }/TestComponent4.css`);
  expect(styleFileExists).toBeFalsy();
});
