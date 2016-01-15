# Future Web App Generator

Write the app of the future using a [Yeoman](http://yeoman.io) generator that scaffolds out a front-end web app using [gulp](http://gulpjs.com/) for the build process, [Babel](https://babeljs.io) to leverage [ES2015 features](https://babeljs.io/docs/learn-es2015/), and [PostCSS](https://github.com/postcss/postcss) with [cssnext](http://cssnext.io) for CSS4 syntax.


[![npm version](https://badge.fury.io/js/generator-future-webapp.svg)](https://www.npmjs.com/package/generator-future-webapp)

## Features

Please see our [gulpfile](app/templates/gulpfile.babel.js) for up to date information on what we support.

* CSS Autoprefixing
* Write the CSS of the future with [cssnext](http://cssnext.io) and [PostCSS](https://github.com/postcss/postcss)
* Write the JavaScript of the future using [ES2015 features](https://babeljs.io/docs/learn-es2015/) by using [Babel](https://babeljs.io)
* Built-in preview server with BrowserSync
* Automagically lint your scripts
* Map compiled CSS to source stylesheets with source maps
* Awesome image optimization
* Automagically wire-up dependencies installed with [Bower](http://bower.io)

*For more information on what this generator can do for you, take a look at the [gulp plugins](app/templates/_package.json) used in the `package.json`.*


## Getting Started

- Install dependencies: `npm install --global yo gulp bower`
- Install the generator: `npm install --global generator-future-webapp`
- Run `yo future-webapp` to scaffold your webapp
- Run `gulp serve` to preview and watch for changes
- Run `bower install --save <package>` to install frontend dependencies
- Run `gulp serve:test` to run the tests in the browser
- Run `gulp` to build your webapp for production
- Run `gulp serve:dist` to preview the production build


## Options

- `--skip-install`
  Skips the automatic execution of `bower` and `npm` after scaffolding has finished.
- `--test-framework=<framework>`
  Either `mocha` or `jasmine`. Defaults to `mocha`.

## License

[ISC license](https://opensource.org/licenses/ISC)
