const simpleGit = require('simple-git');
const groq = require('groq');
const assert = require('assert');

describe('simple-git', () => {
  it('should clone a repository', async () => {
    const git = simpleGit();
    await git.clone('https://github.com/harisbeha/git-js.git', 'test-repo');
    assert.ok(true);
  });

  it('should pull changes', async () => {
    const git = simpleGit('test-repo');
    await git.pull();
    assert.ok(true);
  });

  it('should get tags', async () => {
    const git = simpleGit('test-repo');
    const tags = await git.tags();
    assert.ok(tags);
  });

  it('should add tag', async () => {
    const git = simpleGit('test-repo');
    await git.addTag('test-tag');
    assert.ok(true);
  });

  it('should log commits', async () => {
    const git = simpleGit('test-repo');
    const commits = await git.log();
    assert.ok(commits);
  });
});