/**
 * Test file for Git MCP
 * Demonstrates basic usage of the Git MCP client
 */

const GitMCPClient = require('./git_mcp_client');

async function runTests() {
  const client = new GitMCPClient();
  
  try {
    // Check server status
    console.log('Checking server status...');
    const status = await client.status();
    console.log('Server status:', status);

    // Current repository status
    console.log('\nChecking current repository status...');
    const repoStatus = await client.execute('status', '../');
    console.log(repoStatus.stdout);

    // List all branches
    console.log('\nListing all branches...');
    const branches = await client.execute('branch -a', '../');
    console.log(branches.stdout);

    console.log('\nTests completed successfully');
  } catch (error) {
    console.error('Test error:', error.message);
  }
}

// Run tests
runTests();
