#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('Starting build process...');

// Function to execute command with error handling
function executeCommand(command) {
  try {
    console.log(`Executing: ${command}`);
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`Command failed: ${command}`, error.message);
    return false;
  }
}

try {
  // Ensure node_modules exists or install dependencies
  if (!fs.existsSync(path.join(process.cwd(), 'node_modules'))) {
    console.log('Installing dependencies...');
    if (!executeCommand('npm install')) {
      throw new Error('Failed to install dependencies');
    }
  }

  // Try different approaches to run the build
  console.log('Attempting to run Vite build...');
  
  // First try: direct npx command
  if (!executeCommand('npx vite build')) {
    console.log('First attempt failed, trying alternative approach...');
    
    // Second try: using node modules directly
    const vitePath = path.join(process.cwd(), 'node_modules', '.bin', 'vite');
    if (fs.existsSync(vitePath)) {
      if (!executeCommand(`${vitePath} build`)) {
        throw new Error('All build attempts failed');
      }
    } else {
      // Third try: install vite globally and try again
      console.log('Installing vite globally...');
      if (executeCommand('npm install -g vite')) {
        if (!executeCommand('vite build')) {
          throw new Error('All build attempts failed');
        }
      } else {
        throw new Error('Failed to install vite globally');
      }
    }
  }
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build process failed:', error.message);
  process.exit(1);
}