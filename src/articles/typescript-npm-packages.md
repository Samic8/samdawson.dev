---
title: Compiling NPM packages with typescript
slug: typescript-npm-packages
techs: ["Typescript"]
date: "2019-11-30"
---

There are so many options for bundling javascript code for NPM packages. This is the most frustrating part of web development for me at the moment because it involves figuring out what combination of tools and configuration options for those tools you need.

The least amount of tools and configuration you can get away with the better. You can always make it more complex later on as your needs change and you need to support more use cases.

A build process I have landed on is **gulp + rollup**. We are going to look at the build process for a package called [get-active-classes](https://www.samdawson.dev/article/reacts-missing-conditional-class-utility). Lets start with the gulp file that builds the bundles.

```js
// gulpfile.js
const gulp = require("gulp")
const rollup = require("rollup")
const rollupTypescript = require("rollup-plugin-typescript2")

gulp.task("default", () => {
  return rollup
    .rollup({
      input: "./src/get-active-classes.ts",
      plugins: [
        // Options specificed for typescript type declaration files
        rollupTypescript({ declarationDir: process.cwd(), declaration: true }),
      ],
    })
    .then(bundle => {
      // Build each type of module you want
      // EsModule
      writeFile(bundle, "es")
      // CommonJS
      writeFile(bundle, "cjs")
    })
})

function writeFile(bundle, format) {
  return bundle.write({
    file: `./get-active-classes.${format}.js`,
    format,
    name: "get-active-classes",
    sourcemap: true,
  })
}
```

It builds two versions of the source file, one using CommonJS and the other using ES Modules. Along with a **get-active-classes.d.ts** file for typescript type declarations.

We are writing the compiled files to the root directory because that is where the package.json lives. NPM packages use the package.json directory as the root directory. So if we had multiple files (e.g <root>/helper.js) the consumer could do

```js
import getActiveClasseshelper from "get-active-classes/helper"
```

In the example of get-active-classes there is only one file so this is not a concern yet.

## .gitignore and .npmignore

A gotcha (that got me) is that NPM packages use .gitignore files to determine what files it should ignore.

In my case, I had **get-active-classes.cjs.js** (etc) in the .gitignore file, so when I published the npm package the compiled files were missing...

To solve this I added a .npmignore file. If that is present then NPM does not use the .gitignore file.

```
 // .npmignore
 node_modules
 .github
```

## Package.json config

To bring everything together we need some scripts in our package.json and to point the "main", "module" and "types" properties to our files.

- **main** — path to CommonJS build
- **module** — path to variant with ES module
- **types** — path to type declaration file/s

Along with some scripts to make building and deploying process standardized.

```json
{
  "name": "get-active-classes",
  "version": "0.0.11",
  "main": "get-active-classes.cjs.js",
  "module": "get-active-classes.es.js",
  "types": "get-active-classes.d.ts",
  "license": "MIT",
  "scripts": {
    "test": "jest",
    "build": "gulp",
    "deploy": "yarn build && yarn publish"
  },
  "devDependencies": {
    "@babel/core": "^7.7.2",
    "@babel/preset-env": "^7.7.1",
    "@babel/preset-typescript": "^7.7.2",
    "@types/jest": "^24.0.23",
    "babel-jest": "^24.9.0",
    "gulp": "^4.0.2",
    "jest": "^24.9.0",
    "rollup": "^1.27.0",
    "rollup-plugin-typescript2": "^0.25.2",
    "tslib": "^1.10.0",
    "typescript": "^3.7.2"
  }
}
```

I used jest for unit tests you can copy my config for [get-active-classes](https://github.com/Samic8/get-active-classes) if you want to use the same set up.

## Typescript compiler

Another option I had played around with for bundling this small library was to just use the typescript compiler on its own. It seemed to be a great option apart from not being able to specify the bundle names to add **.cjs** or **.es** to the file names.

I could have renamed the files after the bundles were generated but that seemed messier than just using rollup. The typescript compiler approach would of lead to fewer dependencies though.
