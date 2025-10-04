function SimpleGit(workingDirPath) {
  /**
   * Initialize a new instance of SimpleGit.
   * @param {string} [workingDirPath='.'] - The path to the working directory.
   */
  this.workingDirPath = workingDirPath || '.';
}

/**
 * Add a local configuration property.
 * @param {string} key - The configuration key.
 * @param {string} value - The configuration value.
 * @param {function} [handlerFn] - The callback function.
 * @returns {SimpleGit}
 */
SimpleGit.prototype.addConfig = function(key, value, handlerFn) {
  // implementation
};

/**
 * Initialize a repository.
 * @param {boolean} [bare=false] - Whether to initialize a bare repository.
 * @param {function} handlerFn - The callback function.
 * @returns {SimpleGit}
 */
SimpleGit.prototype.init = function(bare, handlerFn) {
  // implementation
};

/**
 * Clone a remote repository.
 * @param {string} repoPath - The path to the remote repository.
 * @param {string} localPath - The path to the local directory.
 * @param {function} handlerFn - The callback function.
 * @returns {SimpleGit}
 */
SimpleGit.prototype.clone = function(repoPath, localPath, handlerFn) {
  // implementation
};

/**
 * Get the diff of the current repository compared to the last commit.
 * @param {object|string} [options] - The diff options or a string of options.
 * @param {function} handlerFn - The callback function.
 * @returns {SimpleGit}
 */
SimpleGit.prototype.diff = function(options, handlerFn) {
  // implementation
};

/**
 * Get a summary of the diff for files in the repository.
 * @param {function} handlerFn - The callback function.
 * @returns {SimpleGit}
 */
SimpleGit.prototype.diffSummary = function(handlerFn) {
  // implementation
};

/**
 * Pull all updates from the repository.
 * @param {string} remote - The name of the remote repository.
 * @param {string} branch - The name of the branch.
 * @param {function} handlerFn - The callback function.
 * @returns {SimpleGit}
 */
SimpleGit.prototype.pull = function(remote, branch, handlerFn) {
  // implementation
};

/**
 * Update the local working copy database with changes from a remote repository.
 * @param {string} remote - The name of the remote repository.
 * @param {string} branch - The name of the branch.
 * @param {function} handlerFn - The callback function.
 * @returns {SimpleGit}
 */
SimpleGit.prototype.fetch = function(remote, branch, handlerFn) {
  // implementation
};

/**
 * List all tags.
 * @param {function} handlerFn - The callback function.
 * @returns {SimpleGit}
 */
SimpleGit.prototype.tags = function(handlerFn) {
  // implementation
};

/**
 * Add a lightweight tag to the head of the current branch.
 * @param {string} name - The name of the tag.
 * @param {function} handlerFn - The callback function.
 * @returns {SimpleGit}
 */
SimpleGit.prototype.addTag = function(name, handlerFn) {
  // implementation
};

/**
 * Add an annotated tag to the head of the current branch.
 * @param {string} tagName - The name of the tag.
 * @param {string} tagMessage - The message for the tag.
 * @param {function} handlerFn - The callback function.
 * @returns {SimpleGit}
 */
SimpleGit.prototype.addAnnotatedTag = function(tagName, tagMessage, handlerFn) {
  // implementation
};

/**
 * List commits between options.from and options.to tags or branch.
 * @param {object} [options] - The log options.
 * @param {function} handlerFn - The callback function.
 * @returns {SimpleGit}
 */
SimpleGit.prototype.log = function(options, handlerFn) {
  // implementation
};

/**
 * Check out the supplied tag, revision or branch.
 * @param {string} checkoutWhat - The tag, revision or branch to check out.
 * @param {function} handlerFn - The callback function.
 * @returns {SimpleGit}
 */
SimpleGit.prototype.checkout = function(checkoutWhat, handlerFn) {
  // implementation
};

/**
 * Check out a new branch from the supplied start point.
 * @param {string} branchName - The name of the branch.
 * @param {string} startPoint - The start point of the branch.
 * @param {function} handlerFn - The callback function.
 * @returns {SimpleGit}
 */
SimpleGit.prototype.checkoutBranch = function(branchName, startPoint, handlerFn) {
  // implementation
};

/**
 * Check out a new local branch.
 * @param {string} branchName - The name of the branch.
 * @param {function} handlerFn - The callback function.
 * @returns {SimpleGit}
 */
SimpleGit.prototype.checkoutLocalBranch = function(branchName, handlerFn) {
  // implementation
};

/**
 * Check out the latest tag.
 * @param {function} handlerFn - The callback function.
 * @returns {SimpleGit}
 */
SimpleGit.prototype.checkoutLatestTag = function(handlerFn) {
  // implementation
};

/**
 * Add one or more files to be under source control.
 * @param {string[]} files - The files to add.
 * @param {function} handlerFn - The callback function.
 * @returns {SimpleGit}
 */
SimpleGit.prototype.add = function(files, handlerFn) {
  // implementation
};

/**
 * Get a list of all branches.
 * @param {function} [handlerFn] - The callback function.
 * @returns {SimpleGit}
 */
SimpleGit.prototype.branch = function(handlerFn) {
  // implementation
};

/**
 * Commit changes in the current working directory with the supplied message.
 * @param {string|string[]} message - The commit message.
 * @param {function} handlerFn - The callback function.
 * @returns {SimpleGit}
 */
SimpleGit.prototype.commit = function(message, handlerFn) {
  // implementation
};

/**
 * Commit changes on the named files with the supplied message.
 * @param {string} message - The commit message.
 * @param {string[]} files - The files to commit.
 * @param {object} [options] - The commit options.
 * @param {function} handlerFn - The callback function.
 * @returns {SimpleGit}
 */
SimpleGit.prototype.commit = function(message, files, options, handlerFn) {
  // implementation
};

/**
 * Set the command to use to reference git.
 * @param {string} gitPath - The path to the git binary.
 * @returns {SimpleGit}
 */
SimpleGit.prototype.customBinary = function(gitPath) {
  // implementation
};

/**
 * Merge from one branch to another.
 * @param {string} from - The branch to merge from.
 * @param {string} to - The branch to merge to.
 * @param {object} [options] - The merge options.
 * @param {function} handlerFn - The callback function.
 * @returns {SimpleGit}
 */
SimpleGit.prototype.mergeFromTo = function(from, to, options, handlerFn) {
  // implementation
};

/**
 * Push to a named remote and named branch.
 * @param {string} remote - The name of the remote repository.
 * @param {string} branch - The name of the branch.
 * @param {function} handlerFn - The callback function.
 * @returns {SimpleGit}
 */
SimpleGit.prototype.push = function(remote, branch, handlerFn) {
  // implementation
};

/**
 * Push tags to a named remote.
 * @param {string} remote - The name of the remote repository.
 * @param {function} handlerFn - The callback function.
 * @returns {SimpleGit}
 */
SimpleGit.prototype.pushTags = function(remote, handlerFn) {
  // implementation
};

/**
 * Set whether the console should be used for logging errors.
 * @param {boolean} isSilent - Whether to log errors to the console.
 * @returns {SimpleGit}
 */
SimpleGit.prototype.silent = function(isSilent) {
  // implementation
};

/**
 * Add a new sub module.
 * @param {string} repo - The path to the sub module repository.
 * @param {string} path - The path to the sub module.
 * @param {function} [handlerFn] - The callback function.
 * @returns {SimpleGit}
 */
SimpleGit.prototype.submoduleAdd = function(repo, path, handlerFn) {
  // implementation
};

/**
 * Update sub modules.
 * @param {string[]} [args] - The arguments to pass to the git submodule update command.
 * @param {function} [handlerFn] - The callback function.
 * @returns {SimpleGit}
 */
SimpleGit.prototype.submoduleUpdate = function(args, handlerFn) {
  // implementation
};

/**
 * Remove any number of files from source control.
 * @param {string[]} files - The files to remove.
 * @param {function} handlerFn - The callback function.
 * @returns {SimpleGit}
 */
SimpleGit.prototype.rm = function(files, handlerFn) {
  // implementation
};

/**
 * Remove files from source control but leave them on disk.
 * @param {string[]} files - The files to remove.
 * @param {function} handlerFn - The callback function.
 * @returns {SimpleGit}
 */
SimpleGit.prototype.rmKeepLocal = function(files, handlerFn) {
  // implementation
};

/**
 * Add a new named remote to be tracked as name at the path repo.
 * @param {string} name - The name of the remote repository.
 * @param {string} repo - The path to the remote repository.
 * @param {function} handlerFn - The callback function.
 * @returns {SimpleGit}
 */
SimpleGit.prototype.addRemote = function(name, repo, handlerFn) {
  // implementation
};

/**
 * Remove the named remote.
 * @param {string} name - The name of the remote repository.
 * @param {function} handlerFn - The callback function.
 * @returns {SimpleGit}
 */
SimpleGit.prototype.removeRemote = function(name, handlerFn) {
  // implementation
};

/**
 * Get a list of the named remotes.
 * @param {boolean} [verbose=false] - Whether to include the URLs and purpose of each ref.
 * @param {function} handlerFn - The callback function.
 * @returns {SimpleGit}
 */
SimpleGit.prototype.getRemotes = function(verbose, handlerFn) {
  // implementation
};

/**
 * Reset the repository.
 * @param {string|object} [resetMode='soft'] - The reset mode or options.
 * @param {function} handlerFn - The callback function.
 * @returns {SimpleGit}
 */
SimpleGit.prototype.reset = function(resetMode, handlerFn) {
  // implementation
};

/**
 * Wrap git rev-parse.
 * @param {object} [options] - The rev-parse options.
 * @param {function} handlerFn - The callback function.
 * @returns {SimpleGit}
 */
SimpleGit.prototype.revparse = function(options, handlerFn) {
  // implementation
};

/**
 * Get the status of the current repository.
 * @param {function} handlerFn - The callback function.
 * @returns {SimpleGit}
 */
SimpleGit.prototype.status = function(handlerFn) {
  // implementation
};

/**
 * Show various types of objects.
 * @param {string|string[]} [options] - The show options.
 * @param {function} handlerFn - The callback function.
 * @returns {SimpleGit}
 */
SimpleGit.prototype.show = function(options, handlerFn) {
  // implementation
};

/**
 * Check if filepath is excluded by .gitignore rules.
 * @param {string|string[]} filepath - The file path or paths to check.
 * @param {function} handlerFn - The callback function.
 * @returns {SimpleGit}
 */
SimpleGit.prototype.checkIgnore = function(filepath, handlerFn) {
  // implementation
};

/**
 * List remote repositories.
 * @param {string[]} [args] - The arguments to pass to the git ls-remote command.
 * @param {function} handlerFn - The callback function.
 * @returns {SimpleGit}
 */
SimpleGit.prototype.listRemote = function(args, handlerFn) {
  // implementation
};

/**
 * Attach a handler that will be called with the name of the command being run and the stdout and stderr readable streams.
 * @param {function} handlerFn - The callback function.
 * @returns {SimpleGit}
 */
SimpleGit.prototype.outputHandler = function(handlerFn) {
  // implementation
};

/**
 * Call a simple function in the current step.
 * @param {function} handlerFn - The callback function.
 * @returns {SimpleGit}
 */
SimpleGit.prototype.then = function(handlerFn) {
  // implementation
};
