/**
 * Git MCP Client
 * A client library to interact with the Git MCP server
 */

const axios = require('axios');

class GitMCPClient {
  constructor(serverUrl = 'http://localhost:3001') {
    this.serverUrl = serverUrl;
  }

  /**
   * Execute a git command through the MCP server
   * @param {string} command - Git command to execute (without 'git' prefix)
   * @param {string} repository - Optional repository path
   * @returns {Promise} - Promise with command execution results
   */
  async execute(command, repository = null) {
    try {
      const response = await axios.post(`${this.serverUrl}/git/execute`, {
        command,
        repository
      });
      
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.error || 'Error executing git command');
      }
      throw error;
    }
  }

  /**
   * Check server status
   * @returns {Promise} - Promise with server status
   */
  async status() {
    try {
      const response = await axios.get(`${this.serverUrl}/status`);
      return response.data;
    } catch (error) {
      throw new Error('Unable to connect to Git MCP Server');
    }
  }

  // Common git operations as convenience methods
  async clone(url, directory, options = '') {
    return this.execute(`clone ${options} ${url} ${directory}`);
  }

  async pull(repository, branch = '') {
    return this.execute(`pull ${branch}`, repository);
  }

  async push(repository, options = '') {
    return this.execute(`push ${options}`, repository);
  }

  async commit(repository, message) {
    return this.execute(`commit -m "${message}"`, repository);
  }

  async add(repository, files = '.') {
    return this.execute(`add ${files}`, repository);
  }

  async status(repository) {
    return this.execute('status', repository);
  }

  async checkout(repository, branch) {
    return this.execute(`checkout ${branch}`, repository);
  }

  async createBranch(repository, branch) {
    return this.execute(`checkout -b ${branch}`, repository);
  }
}

module.exports = GitMCPClient;
