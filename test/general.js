'use strict';
let path = require('path');
let helpers = require('yeoman-test');
let assert = require('yeoman-assert');

describe('general', () => {
  before( (done) => {
    try {
      helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(__dirname, 'temp'))
        .withOptions({
          'skip-install': true
        })
        .withPrompts({
          user: 'testUser',
          repo: 'testRepo',
          description: 'test description',
          author: 'testAuthor'
        })
        .withGenerators([
          [helpers.createDummyGenerator(), 'mocha:app']
        ])
        .on('end', done)
    } catch(x) {
      console.log(x);
    }
  });

  it('the generator can be required without throwing', () => {
    // not testing the actual run of generators yet
    require('../app');
  });

  it('creates expected files', () => {
    assert.file([
      'bower.json',
      'package.json',
      'gulpfile.babel.js',
      '.editorconfig',
      '.bowerrc',
      '.gitignore',
      '.gitattributes',
      '.babelrc',
      'app/robots.txt',
      'app/index.html',
      'app/scripts/main.js',
      'app/styles/main.css',
      'app/images',
      'app/fonts',
      'test'
    ]);
  });
});
