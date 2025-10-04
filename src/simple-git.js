const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Simple Git
 * A light weight interface for running git commands in any node.js application.
 * @param {string} [workingDirPath=''] - The path to the working directory.
 * @returns {SimpleGit} The SimpleGit instance.
 */
function simpleGit(workingDirPath = '') {
  const git = 'git';
  let silent = process.env.NODE_ENV.includes('prod');

  /**
   * Add a local configuration property.
   * @param {string} key - The configuration key.
   * @param {string} value - The configuration value.
   * @param {function} [handlerFn] - The callback function.
   * @returns {SimpleGit} The SimpleGit instance.
   */
  function addConfig(key, value, handlerFn) {
    const args = [git, 'config', key, value];
    return execute(args, handlerFn);
  }

  /**
   * Initialize a repository.
   * @param {boolean} [bare=false] - Whether to initialize a bare repository.
   * @param {function} handlerFn - The callback function.
   * @returns {SimpleGit} The SimpleGit instance.
   */
  function init(bare, handlerFn) {
    const args = [git, 'init'];
    if (bare) args.push('--bare');
    return execute(args, handlerFn);
  }

  /**
   * Clone a remote repository.
   * @param {string} repoPath - The path to the remote repository.
   * @param {string} localPath - The path to the local directory.
   * @param {function} handlerFn - The callback function.
   * @returns {SimpleGit} The SimpleGit instance.
   */
  function clone(repoPath, localPath, handlerFn) {
    const args = [git, 'clone', repoPath, localPath];
    return execute(args, handlerFn);
  }

  /**
   * Get the diff of the current repository compared to the last commit.
   * @param {string|object} [options=''] - The diff options or a string of options.
   * @param {function} handlerFn - The callback function.
   * @returns {SimpleGit} The SimpleGit instance.
   */
  function diff(options, handlerFn) {
    const args = [git, 'diff'];
    if (typeof options === 'string') args.push(options);
    else if (typeof options === 'object') {
      Object.keys(options).forEach(key => args.push(key, options[key]));
    }
    return execute(args, handlerFn);
  }

  /**
   * Get the diff summary for files in the repository.
   * @param {function} handlerFn - The callback function.
   * @returns {SimpleGit} The SimpleGit instance.
   */
  function diffSummary(handlerFn) {
    const args = [git, 'diff', '--stat'];
    return execute(args, handlerFn);
  }

  /**
   * Pull all updates from the repository.
   * @param {string} [remote='origin'] - The remote repository name.
   * @param {string} [branch='master'] - The branch name.
   * @param {function} handlerFn - The callback function.
   * @returns {SimpleGit} The SimpleGit instance.
   */
  function pull(remote = 'origin', branch = 'master', handlerFn) {
    const args = [git, 'pull', remote, branch];
    return execute(args, handlerFn);
  }

  /**
   * Update the local working copy database with changes from a remote repository.
   * @param {string} [remote='origin'] - The remote repository name.
   * @param {string} [branch='master'] - The branch name.
   * @param {function} handlerFn - The callback function.
   * @returns {SimpleGit} The SimpleGit instance.
   */
  function fetch(remote = 'origin', branch = 'master', handlerFn) {
    const args = [git, 'fetch', remote, branch];
    return execute(args, handlerFn);
  }

  /**
   * List all tags.
   * @param {function} handlerFn - The callback function.
   * @returns {SimpleGit} The SimpleGit instance.
   */
  function tags(handlerFn) {
    const args = [git, 'tag'];
    return execute(args, handlerFn);
  }

  /**
   * Add a lightweight tag to the head of the current branch.
   * @param {string} name - The tag name.
   * @param {function} handlerFn - The callback function.
   * @returns {SimpleGit} The SimpleGit instance.
   */
  function addTag(name, handlerFn) {
    const args = [git, 'tag', name];
    return execute(args, handlerFn);
  }

  /**
   * Add an annotated tag to the head of the current branch.
   * @param {string} tagName - The tag name.
   * @param {string} tagMessage - The tag message.
   * @param {function} handlerFn - The callback function.
   * @returns {SimpleGit} The SimpleGit instance.
   */
  function addAnnotatedTag(tagName, tagMessage, handlerFn) {
    const args = [git, 'tag', '-a', tagName, '-m', tagMessage];
    return execute(args, handlerFn);
  }

  /**
   * List commits between options.from and options.to tags or branch.
   * @param {object} [options={}] - The log options.
   * @param {function} handlerFn - The callback function.
   * @returns {SimpleGit} The SimpleGit instance.
   */
  function log(options = {}, handlerFn) {
    const args = [git, 'log'];
    if (options.from) args.push(options.from);
    if (options.to) args.push(options.to);
    if (options.file) args.push('--', options.file);
    return execute(args, handlerFn);
  }

  /**
   * Checkout the supplied tag, revision or branch.
   * @param {string} checkoutWhat - The tag, revision or branch to checkout.
   * @param {function} handlerFn - The callback function.
   * @returns {SimpleGit} The SimpleGit instance.
   */
  function checkout(checkoutWhat, handlerFn) {
    const args = [git, 'checkout', checkoutWhat];
    return execute(args, handlerFn);
  }

  /**
   * Checkout a new branch from the supplied start point.
   * @param {string} branchName - The branch name.
   * @param {string} startPoint - The start point.
   * @param {function} handlerFn - The callback function.
   * @returns {SimpleGit} The SimpleGit instance.
   */
  function checkoutBranch(branchName, startPoint, handlerFn) {
    const args = [git, 'checkout', '-b', branchName, startPoint];
    return execute(args, handlerFn);
  }

  /**
   * Checkout a new local branch.
   * @param {string} branchName - The branch name.
   * @param {function} handlerFn - The callback function.
   * @returns {SimpleGit} The SimpleGit instance.
   */
  function checkoutLocalBranch(branchName, handlerFn) {
    const args = [git, 'checkout', '-b', branchName];
    return execute(args, handlerFn);
  }

  /**
   * Checkout the latest tag.
   * @param {function} handlerFn - The callback function.
   * @returns {SimpleGit} The SimpleGit instance.
   */
  function checkoutLatestTag(handlerFn) {
    const args = [git, 'checkout', 'tags/latest'];
    return execute(args, handlerFn);
  }

  /**
   * Add one or more files to be under source control.
   * @param {string[]} files - The files to add.
   * @param {function} handlerFn - The callback function.
   * @returns {SimpleGit} The SimpleGit instance.
   */
  function add(files, handlerFn) {
    const args = [git, 'add'].concat(files);
    return execute(args, handlerFn);
  }

  /**
   * Get a list of all branches.
   * @param {function} [handlerFn] - The callback function.
   * @returns {SimpleGit} The SimpleGit instance.
   */
  function branch(handlerFn) {
    const args = [git, 'branch'];
    return execute(args, handlerFn);
  }

  /**
   * Commit changes in the current working directory with the supplied message.
   * @param {string|string[]} message - The commit message.
   * @param {function} handlerFn - The callback function.
   * @returns {SimpleGit} The SimpleGit instance.
   */
  function commit(message, handlerFn) {
    const args = [git, 'commit', '-m', message];
    return execute(args, handlerFn);
  }

  /**
   * Commit changes on the named files with the supplied message.
   * @param {string} message - The commit message.
   * @param {string[]} files - The files to commit.
   * @param {object} [options={}] - The commit options.
   * @param {function} handlerFn - The callback function.
   * @returns {SimpleGit} The SimpleGit instance.
   */
  function commitFiles(message, files, options = {}, handlerFn) {
    const args = [git, 'commit', '-m', message].concat(files);
    Object.keys(options).forEach(key => args.push(key, options[key]));
    return execute(args, handlerFn);
  }

  /**
   * Set the command to use to reference git.
   * @param {string} gitPath - The path to the git binary.
   * @returns {SimpleGit} The SimpleGit instance.
   */
  function customBinary(gitPath) {
    git = gitPath;
    return this;
  }

  /**
   * Merge from one branch to another.
   * @param {string} from - The branch to merge from.
   * @param {string} to - The branch to merge to.
   * @param {object} [options={}] - The merge options.
   * @param {function} handlerFn - The callback function.
   * @returns {SimpleGit} The SimpleGit instance.
   */
  function mergeFromTo(from, to, options = {}, handlerFn) {
    const args = [git, 'merge', from, to];
    Object.keys(options).forEach(key => args.push(key, options[key]));
    return execute(args, handlerFn);
  }

  /**
   * Push to a named remote and named branch.
   * @param {string} remote - The remote repository name.
   * @param {string} branch - The branch name.
   * @param {function} handlerFn - The callback function.
   * @returns {SimpleGit} The SimpleGit instance.
   */
  function push(remote, branch, handlerFn) {
    const args = [git, 'push', remote, branch];
    return execute(args, handlerFn);
  }

  /**
   * Push tags to a named remote.
   * @param {string} remote - The remote repository name.
   * @param {function} handlerFn - The callback function.
   * @returns {SimpleGit} The SimpleGit instance.
   */
  function pushTags(remote, handlerFn) {
    const args = [git, 'push', remote, '--tags'];
    return execute(args, handlerFn);
  }

  /**
   * Set whether the console should be used for logging errors.
   * @param {boolean} isSilent - Whether to log errors silently.
   * @returns {SimpleGit} The SimpleGit instance.
   */
  function silent(isSilent) {
    silent = isSilent;
    return this;
  }

  /**
   * Add a new submodule.
   * @param {string} repo - The repository URL.
   * @param {string} path - The path to the submodule.
   * @param {function} [handlerFn] - The callback function.
   * @returns {SimpleGit} The SimpleGit instance.
   */
  function submoduleAdd(repo, path, handlerFn) {
    const args = [git, 'submodule', 'add', repo, path];
    return execute(args, handlerFn);
  }

  /**
   * Update submodules.
   * @param {string[]} [args=[]] - The arguments to pass to the submodule update command.
   * @param {function} [handlerFn] - The callback function.
   * @returns {SimpleGit} The SimpleGit instance.
   */
  function submoduleUpdate(args = [], handlerFn) {
    const submoduleArgs = [git, 'submodule', 'update'].concat(args);
    return execute(submoduleArgs, handlerFn);
  }

  /**
   * Remove any number of files from source control.
   * @param {string[]} files - The files to remove.
   * @param {function} handlerFn - The callback function.
   * @returns {SimpleGit} The SimpleGit instance.
   */
  function rm(files, handlerFn) {
    const args = [git, 'rm'].concat(files);
    return execute(args, handlerFn);
  }

  /**
   * Remove files from source control but leave them on disk.
   * @param {string[]} files - The files to remove.
   * @param {function} handlerFn - The callback function.
   * @returns {SimpleGit} The SimpleGit instance.
   */
  function rmKeepLocal(files, handlerFn) {
    const args = [git, 'rm', '--cached'].concat(files);
    return execute(args, handlerFn);
  }

  /**
   * Add a new named remote to be tracked as name at the path repo.
   * @param {string} name - The remote name.
   * @param {string} repo - The repository URL.
   * @param {function} handlerFn - The callback function.
   * @returns {SimpleGit} The SimpleGit instance.
   */
  function addRemote(name, repo, handlerFn) {
    const args = [git, 'remote', 'add', name, repo];
    return execute(args, handlerFn);
  }

  /**
   * Remove the named remote.
   * @param {string} name - The remote name.
   * @param {function} handlerFn - The callback function.
   * @returns {SimpleGit} The SimpleGit instance.
   */
  function removeRemote(name, handlerFn) {
    const args = [git, 'remote', 'rm', name];
    return execute(args, handlerFn);
  }

  /**
   * Get a list of the named remotes.
   * @param {boolean} [verbose=false] - Whether to include the URLs and purpose of each ref.
   * @param {function} handlerFn - The callback function.
   * @returns {SimpleGit} The SimpleGit instance.
   */
  function getRemotes(verbose = false, handlerFn) {
    const args = [git, 'remote'];
    if (verbose) args.push('-v');
    return execute(args, handlerFn);
  }

  /**
   * Reset the repository.
   * @param {string|string[]} [resetMode='soft'] - The reset mode.
   * @param {function} handlerFn - The callback function.
   * @returns {SimpleGit} The SimpleGit instance.
   */
  function reset(resetMode = 'soft', handlerFn) {
    const args = [git, 'reset', resetMode];
    return execute(args, handlerFn);
  }

  /**
   * Wrap git rev-parse.
   * @param {string[]} [options=[]] - The options to pass to the rev-parse command.
   * @param {function} handlerFn - The callback function.
   * @returns {SimpleGit} The SimpleGit instance.
   */
  function revparse(options = [], handlerFn) {
    const args = [git, 'rev-parse'].concat(options);
    return execute(args, handlerFn);
  }

  /**
   * Get the status of the current repository.
   * @param {function} handlerFn - The callback function.
   * @returns {SimpleGit} The SimpleGit instance.
   */
  function status(handlerFn) {
    const args = [git, 'status'];
    return execute(args, handlerFn);
  }

  /**
   * Show various types of objects.
   * @param {string|string[]} [options=''] - The options to pass to the show command.
   * @param {function} handlerFn - The callback function.
   * @returns {SimpleGit} The SimpleGit instance.
   */
  function show(options = '', handlerFn) {
    const args = [git, 'show', options];
    return execute(args, handlerFn);
  }

  /**
   * Check if a filepath is excluded by .gitignore rules.
   * @param {string[]} filepaths - The filepaths to check.
   * @param {function} handlerFn - The callback function.
   * @returns {SimpleGit} The SimpleGit instance.
   */
  function checkIgnore(filepaths, handlerFn) {
    const args = [git, 'check-ignore'].concat(filepaths);
    return execute(args, handlerFn);
  }

  /**
   * List remote repositories.
   * @param {string[]} [args=[]] - The arguments to pass to the ls-remote command.
   * @param {function} handlerFn - The callback function.
   * @returns {SimpleGit} The SimpleGit instance.
   */
  function listRemote(args = [], handlerFn) {
    const listArgs = [git, 'ls-remote'].concat(args);
    return execute(listArgs, handlerFn);
  }

  /**
   * Attach a handler that will be called with the name of the command being run and the stdout and stderr readable streams.
   * @param {function} handlerFn - The callback function.
   * @returns {SimpleGit} The SimpleGit instance.
   */
  function outputHandler(handlerFn) {
    return this;
  }

  /**
   * Call a simple function in the current step.
   * @param {function} handlerFn - The callback function.
   * @returns {SimpleGit} The SimpleGit instance.
   */
  function then(handlerFn) {
    return this;
  }

  function execute(args, handlerFn) {
    const child = childProcess.spawn(args[0], args.slice(1), { cwd: workingDirPath });
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', data => (stdout += data.toString()));
    child.stderr.on('data', data => (stderr += data.toString()));
    child.on('close', code => {
      if (code === 0) {
        handlerFn(null, stdout);
      } else {
        handlerFn(new Error(`Git command failed with code ${code}: ${stderr}`), null);
      }
    });
    return this;
  }

  return {
    addConfig,
    init,
    clone,
    diff,
    diffSummary,
    pull,
    fetch,
    tags,
    addTag,
    addAnnotatedTag,
    log,
    checkout,
    checkoutBranch,
    checkoutLocalBranch,
    checkoutLatestTag,
    add,
    branch,
    commit,
    commitFiles,
    customBinary,
    mergeFromTo,
    push,
    pushTags,
    silent,
    submoduleAdd,
    submoduleUpdate,
    rm,
    rmKeepLocal,
    addRemote,
    removeRemote,
    getRemotes,
    reset,
    revparse,
    status,
    show,
    checkIgnore,
    listRemote,
    outputHandler,
    then
  };
}
