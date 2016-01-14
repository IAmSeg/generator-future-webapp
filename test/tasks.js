'use strict';
let path = require('path');
let assert = require('yeoman-assert');
let helpers = require('yeoman-test');

describe('gulp tasks', () => {
  before( (done) => {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(__dirname, 'temp'))
      .withOptions({'skip-install': true})
      .withPrompts()
      .on('end', done);
  });

  it('should contain necessary tasks', function () {
    [
      'styles',
      'scripts',
      'lint',
      'lint:test',
      'html',
      'images',
      'fonts',
      'extras',
      'clean',
      'serve',
      'serve:dist',
      'serve:test',
      'wiredep',
      'build',
      'default'
    ].forEach(function (task) {
      assert.fileContent('gulpfile.babel.js', 'gulp.task(\'' + task);
    });
  });
});
