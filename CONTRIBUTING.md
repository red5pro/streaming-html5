<h3 align="center">
  <img src="assets/red5pro_logo.png" alt="Red5 Pro Logo" />
</h3>
<p align="center">
  <a href="#requirements">requirements</a> &bull;
  <a href="#developer-quickstart">quickstart</a> &bull;
  <a href="#project-structure">project structure</a>
</p>
-------


# Contributing to Red5 Pro HTML SDK
> The following document describes how to contribute to Red5 Pro HTML SDK.

* [Requirements](#requirements)
* [Developer Quickstart](#developer-quickstart)
  * [Building](#building)
* [Project Structure](#project-structure)
  * [Development](#development)
    * [Babel Transpiler](#babel-transpiler)
    * [Webpack Builds](#webpack-builds)
    * [ESLint](#eslint)

---

# Requirements
Developing and build the *Red5 Pro Testbed* examples project requires:

* [NodeJS](https://nodejs.org/en/)
* NPM (should be installed as part of Node)

## Installation of Requirements
The *Red5 Pro SDK Testbed* examples project was develop using [NodeJS v5](https://nodejs.org/en/blog/release/v5.0.0/), though - most likely - will be compatable with *NodeJS >= 0.12*.

The preferred *NodeJS* version manager is [n](https://github.com/tj/n); `n` makes it very easy to manage different versions of NodeJS for your development needs. Read and follow the instructions regarding [n on Github](https://github.com/tj/n). As a quick walk through to set up development for this project:

```
$ npm install -g n
$ n stable
```

# Developer Quickstart

## Installation
```
$ npm install
```

## Building
To build the project:

```
$ npm run build
```

# Project Structure

## Development
The project is composed of modules written in module syntax of [es2015](http://www.ecma-international.org/ecma-262/6.0/), transpiled using [Babel](https://babeljs.io/) and built using [Webpack](https://github.com/webpack/webpack) for browsers of today.

### Babel Transpiler
[Babel](https://babeljs.io/) is used as a transpiler. This allows for the project source to be written using new features from and syntax of [es2015](https://babeljs.io/docs/learn-es2015/), in the hope/attempt to remove the transpilation once "modern" browsers vendors adopt support for *es2015*.

### Webpack Builds
[Webpack](https://github.com/webpack/webpack) is used to build and deploy the *Red5 Pro Testbed* examples project. It supports running the code through the [Babel](https://babeljs.io/) transpiler and minification through the [Uglify Plugin](https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin).

You can find the *webpack* build configuration at [webpack.config.babel.js](webpack.config.babel.js).

### ESLint
[ESLint](http://eslint.org/) is used as a linting tool for code structure. The default [eslint:recommended](http://eslint.org/docs/user-guide/migrating-to-1.0.0) settings are defined as the base rule set.

To install *eslint* to be used in your preferred editor:

```
$ npm install -g eslint
```

[Please visit the documentation on proper integration with your preferred editor/IDE](http://eslint.org/docs/user-guide/integrations).
