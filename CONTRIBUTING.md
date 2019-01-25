<h3 align="center">
  <img src="assets/red5pro_logo.png" alt="Red5 Pro Logo" />
</h3>
<p align="center">
  <a href="#requirements">requirements</a> &bull;
  <a href="#developer-quickstart">quickstart</a> &bull;
  <a href="#library-structure">library structure</a>
</p>
-------

# Contributing to Red5 Pro HTML SDK
> The following document describes how to contribute to Red5 Pro HTML Testbed.

* [Requirements](#requirements)
* [Developer Quickstart](#developer-quickstart)
  * [Building](#building)
  * [Releasing](#releasing)
    * [Versioning](#versioning)
* [Project Structure](#project-structure)
  * [Adding a Test Page](#adding-a-test-page)
  * [Gulp Builds](#gulp-builds)
  * [ESLint](#eslint)

---

# Requirements
Developing and build the *Red5 Pro HTML Testbed* project requires:

* [NodeJS](https://nodejs.org/en/)
* NPM (should be installed as part of Node)

## Installation of Requirements
The *Red5 Pro HTML Testbed* project was develop using [NodeJS v5](https://nodejs.org/en/blog/release/v5.0.0/), though - most likely - will be compatable with *NodeJS >= 0.12*.

The preferred *NodeJS* version manager is [n](https://github.com/tj/n); `n` makes it very easy to manage different versions of NodeJS for your development needs. Read and follow the instructions regarding [n on Github](https://github.com/tj/n). As a quick walk through to set up development for this project:

```sh
$ npm install -g n
$ n stable
```

# Developer Quickstart

## Installation
```sh
$ npm install
```

## Building
To build the testbed project:

```sh
$ npm run build
```

Windows users should execute the following command(s) assuming `nodejs` is in environment path.

To set environment to `development `:

```sh
SET NODE_ENV=development
```

To build:

```sh
./node_modules/.bin/gulp build
```

## Releasing
To build a release with updated versioning:

```sh
$ npm run dist
```

### Versioning
By default, running `dist` will bump the `PATCH` digit of the semver (i.e., changing release `1.0.0` to `1.0.1`).

You can specify the version target when appropriate by defining a `BUMP` env variable when issuing `dist`. For instance, to build a release with an updated `MAJOR` version:

```sh
$ BUMP=major npm run dist
```

The follow excepted `BUMP` env variable values are:

* `major`
* `minor`
* `patch`

> More information about semantic versioning: [http://semver.org/](http://semver.org/).

# Project Structure
The testbed pages are composed using [Handlebars](http://handlebarsjs.com/) templates. This allows for common declarations - such as header meta, resource includes and common DOM elements chared across pages - to be defined as partials and included when compiled using **Handlebars**.

## Adding a Test Page
The easiest way to create a new page to include in testing is to copy either the `publish` or `subscribe` base examples over to a new directory and modify based on the functional requirements for the test. For example, to create a new publisher-based test page:

```
$ cp -r src/page/test/publish src/page/test/myNewPublishTest
```

Then open the `index.js` and `index.html` files in your favorite editor and modify the functionality to match the test specifications.

Additionally, add the new test to the listing found in [testbed-menu.html](testbed-menu.html) so that it is selectable from the test list.

After you have completed the test modification for the page, update the **README.md** included in the new test directory and run a new buid in order to compile it for the browser:

```
$ npm run build
```

> More information about builds can be found in the previous section.

## Gulp Builds
[Gulp](http://gulpjs.com/) is used to build and deploy system for the *Red5 Pro HTML Testbed* project.

You can view the commands - though most are invoked through aliases `npm` scripts - in the [gulpfile.js](gulpfile.js).

## ESLint
[ESLint](http://eslint.org/) is used as a linting tool for code structure. The default [eslint:recommended](http://eslint.org/docs/user-guide/migrating-to-1.0.0) settings are defined as the base rule set.

To install *eslint* to be used in your preferred editor:

```sh
$ npm install -g eslint
```

[Please visit the documentation on proper integration with your preferred editor/IDE](http://eslint.org/docs/user-guide/integrations).
