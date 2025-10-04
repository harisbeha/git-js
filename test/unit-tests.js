const simpleGit = require('simple-git');
const assert = require('assert');
const path = require('path');

describe('simple-git', () => {
  it('should initialize a repository 🎉', (done) => {
    const git = simpleGit();
    git.init((err) => {
      assert.ifError(err);
      done();
    });
  });

  it('should add a file to the repository 📄', (done) => {
    const git = simpleGit();
    const filePath = path.join(__dirname, 'test-file.txt');
    const fs = require('fs');
    fs.writeFileSync(filePath, 'Hello World!');
    git.add([filePath], (err) => {
      assert.ifError(err);
      done();
    });
  });

  it('should commit changes 📈', (done) => {
    const git = simpleGit();
    git.commit('Initial commit 🎉', (err) => {
      assert.ifError(err);
      done();
    });
  });

  it('should get the status of the repository 📊', (done) => {
    const git = simpleGit();
    git.status((err, status) => {
      assert.ifError(err);
      assert.ok(status);
      done();
    });
  });

  it('should get the log of the repository 📜', (done) => {
    const git = simpleGit();
    git.log((err, log) => {
      assert.ifError(err);
      assert.ok(log);
      done();
    });
  });
});