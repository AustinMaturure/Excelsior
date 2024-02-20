// In your Netlify function directory (e.g., functions/my-function/index.js)
const { spawn } = require('child_process');

exports.handler = async (event, context) => {
  // Pull your Docker container
  const pullProcess = spawn('docker', ['pull', 'austindocked/excelsior:frontend-django']);

  pullProcess.on('exit', (code) => {
    if (code === 0) {
      // Run your Docker container
      const runProcess = spawn('docker', ['run', '-d', '-p', '8000:8000', 'austindocked/excelsior:frontend-django']);
      
      runProcess.on('exit', (code) => {
        if (code === 0) {
          return {
            statusCode: 200,
            body: 'Docker container started successfully.'
          };
        } else {
          return {
            statusCode: 500,
            body: 'Failed to start Docker container.'
          };
        }
      });
    } else {
      return {
        statusCode: 500,
        body: 'Failed to pull Docker container image.'
      };
    }
  });
};

