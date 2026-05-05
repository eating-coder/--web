const { exec } = require('child_process');
const path = require('path');

const projectDir = 'd:\\projects\\xhs-KOC helper';
const nodePath = 'C:\\Program Files\\nodejs';

console.log('Starting npm install...');

// Set PATH to include Node.js directory
const env = { ...process.env, PATH: nodePath + ';' + (process.env.PATH || '') };

exec('npm.cmd install', { cwd: projectDir, env }, (error, stdout, stderr) => {
  if (error) {
    console.error('npm install error:', error);
    return;
  }
  console.log('npm install output:', stdout);
  if (stderr) console.error('npm install stderr:', stderr);

  console.log('Starting Vite dev server...');
  exec('npm.cmd run dev:h5', { cwd: projectDir, env }, (err, out, err2) => {
    if (err) {
      console.error('Vite error:', err);
      return;
    }
    console.log('Vite output:', out);
    if (err2) console.error('Vite stderr:', err2);
  });
});
