/* eslint-disable no-console */
import dotenv from 'dotenv';
dotenv.config();

const cowsay = require('cowsay');

function checkVariables(variables) {
  const missing = [];

  variables.forEach((variable: string) => {
    if (typeof process.env[variable] === 'undefined') {
      missing.push(variable as never);
    }
  });

  if (missing.length) {
    if (missing.length === 1) {
      throw new Error(`Missing environment variable ${missing[0]}`);
    }
    throw new Error(`Missing environment variables ${missing.join(', ')}`);
  }
}

try {
  checkVariables(process.argv.slice(2));
} catch (err: any) {
  console.error(cowsay.say({
    text: err.message
  }));

  process.exit(1);
}
