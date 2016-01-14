'use strict';
let generators = require('yeoman-generator');
let yosay = require('yosay');
let chalk = require('chalk');
let Promise = require('bluebird');
let gitConfig = require('git-config');
let camelcase = require('lodash.camelcase');
let kebabcase = require('lodash.kebabcase');
let trim = require('lodash.trim');
let exec = Promise.promisify(require('child_process').exec);
let _s = require('underscore.string');
let mkdirp = require('mkdirp');

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);

    let testLocal;

    this.option('test-framework', {
      desc: 'Test framework to be invoked',
      type: String,
      defaults: 'mocha'
    });

    if (this.options['test-framework'] === 'mocha') {
      testLocal = require.resolve('generator-mocha/generators/app/index.js');
    } else if (this.options['test-framework'] === 'jasmine') {
      testLocal = require.resolve('generator-jasmine/generators/app/index.js');
    }

    this.composeWith(this.options['test-framework'] + ':app', {
      options: {
        'skip-install': this.options['skip-install']
      }
    }, {
      local: testLocal
    });
  },

  initializing() {
    this.pkg = require('../package.json');
  },

  prompting() {
    this.log(yosay('Welcome to the ' + chalk.green('Future Webapp') + ' Generator!'));

    return Promise.all([exec('npm whoami').catch(function(e) {
      console.error('Error getting npm user name: run `npm login`');
      console.error(e);
    })])
    .then((result) => {
      result = result ? result : {};
      this.username = trim(result[0]);
      return this._showPrompts();
    });
  },

  _showPrompts() {
    var config = gitConfig.sync();
    config.user = config.user ? config.user : {};
    var prompts = [{
      type: 'input',
      name: 'user',
      message: 'What is the Github username/organization for this project?',
      default: this.username,
      store: true
    }, {
      type: 'input',
      name: 'repo',
      message: 'What is the repository/project name?',
      default: kebabcase(this.appname)
    }, {
      type: 'input',
      name: 'description',
      message: 'Provide a short description for this project.'
    }, {
      type: 'input',
      name: 'author',
      message: 'Who is the author of this project?',
      default: config.user.name + ' <' + config.user.email + '>',
      store: true
    }];

    return new Promise((resolve, reject) => {
      this.prompt(prompts, (props) => {
        this.user = props.user;
        this.repo = props.repo;
        this.description = props.description;
        this.author = props.author;
        resolve();
      });
    });
  },

  writing: {
    gulpfile() {
      this.fs.copyTpl(
        this.templatePath('gulpfile.babel.js'),
        this.destinationPath('gulpfile.babel.js'),
        {
          date: (new Date).toISOString().split('T')[0],
          name: this.pkg.name,
          version: this.pkg.version,
          testFramework: this.options['test-framework']
        }
      );
    },

    packageJSON() {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        {
          user: this.user,
          repo: this.repo,
          description: this.description,
          author: this.author
        }
      );
    },

    git() {
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore'));

      this.fs.copy(
        this.templatePath('gitattributes'),
        this.destinationPath('.gitattributes'));
    },

    bower() {
      let bowerJson = {
        name: _s.slugify(this.appname),
        private: true,
        dependencies: {}
      };

      this.fs.writeJSON('bower.json', bowerJson);
      this.fs.copy(
        this.templatePath('bowerrc'),
        this.destinationPath('.bowerrc')
      );
    },

    editorConfig() {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
    },

    h5bp() {
      this.fs.copy(
        this.templatePath('robots.txt'),
        this.destinationPath('app/robots.txt'));
    },

    styles() {
      this.fs.copyTpl(
        this.templatePath('main.css'),
        this.destinationPath('app/styles/main.css')
      );
    },

    scripts() {
      this.fs.copy(
        this.templatePath('main.js'),
        this.destinationPath('app/scripts/main.js')
      );
    },

    html() {
      this.fs.copyTpl(
        this.templatePath('index.html'),
        this.destinationPath('app/index.html'),
        {
          appname: this.appname,
          description: this.description
        }
      );
    },

    babel() {
      this.fs.copyTpl(
        this.templatePath('babelrc'),
        this.destinationPath('.babelrc')
      )
    },

    misc() {
      mkdirp('app/images');
      mkdirp('app/fonts');
    }
  },

  install() {
    this.installDependencies({
      bower: false,
      npm: true,
      skipInstall: this.options['skip-install']
    });
  }
});
