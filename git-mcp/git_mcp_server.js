/**
 * Git MCP Server
 * A lightweight server to handle git commands via MCP protocol
 */

const express = require('express');
const { exec } = require('child_process');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.post('/git/execute', async (req, res) => {
  try {
    const { command, repository } = req.body;
    
    if (!command) {
      return res.status(400).json({ error: 'Git command is required' });
    }
    
    // Prefix repository path if provided
    const gitCommand = repository 
      ? `cd ${repository} && git ${command}`
      : `git ${command}`;
    
    // Execute git command
    exec(gitCommand, (error, stdout, stderr) => {
      if (error) {
        return res.status(500).json({ 
          error: error.message,
          stderr
        });
      }
      
      return res.json({
        success: true,
        stdout,
        stderr
      });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Status endpoint
app.get('/status', (req, res) => {
  res.json({ status: 'Git MCP Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Git MCP Server running on port ${PORT}`);
});
