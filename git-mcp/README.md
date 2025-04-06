# Git MCP Server & Client

A Message Control Protocol (MCP) server and client for handling Git operations in AI applications.

## Features

- Execute git commands through a REST API
- Client library for easy integration with JavaScript/Node.js applications
- Support for repository path specification
- Convenience methods for common git operations

## Installation

```bash
cd git-mcp
npm install
```

## Usage

### Starting the server

```bash
npm start
```

The server will run on port 3001 by default. You can change this by setting the PORT environment variable.

### Using the client library

```javascript
const GitMCPClient = require('./git_mcp_client');

async function example() {
  const client = new GitMCPClient();
  
  // Check server status
  const status = await client.status();
  console.log(status);
  
  // Clone a repository
  await client.clone('https://github.com/username/repo.git', './my-repo');
  
  // Get repository status
  const repoStatus = await client.status('./my-repo');
  console.log(repoStatus.stdout);
  
  // Add files
  await client.add('./my-repo', '.');
  
  // Commit changes
  await client.commit('./my-repo', 'Update files');
  
  // Push changes
  await client.push('./my-repo');
}

example();
```

## API Reference

### Client Methods

- `execute(command, repository)` - Execute a git command
- `clone(url, directory, options)` - Clone a repository
- `pull(repository, branch)` - Pull changes
- `push(repository, options)` - Push changes
- `commit(repository, message)` - Commit changes
- `add(repository, files)` - Add files to staging
- `status(repository)` - Get repository status
- `checkout(repository, branch)` - Checkout a branch
- `createBranch(repository, branch)` - Create and checkout a new branch

## Server Endpoints

- `POST /git/execute` - Execute a git command
- `GET /status` - Check server status
