const { spawn } = require('child_process');

exports.handler = async (event, context) => {
    const runProcess = spawn('docker', ['run', '-d', '-p', '8000:8000', 'austindocked/excelsior:frontend-django']);
    
    runProcess.on('exit', (code) => {
        if (code === 0) {
            console.log('Docker container started successfully.');
        } else {
            console.error('Failed to start Docker container.');
        }
    });
};
