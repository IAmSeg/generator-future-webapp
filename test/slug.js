'use strict';
let path = require('path');
let assert = require('yeoman-assert');
let helpers = require('yeoman-test');

describe('slug name', function () {
  before( (done) => {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(__dirname, 'temp'))
      .withOptions({'skip-install': true})
      .withPrompts()
      .on('end', done)
  });

  it('should generate the same appname in every file', function () {
    let expectedAppName = 'temp';

    assert.fileContent('bower.json', '"name": "temp"');
    assert.fileContent('app/index.html', '<title>temp</title>');
  });
});
