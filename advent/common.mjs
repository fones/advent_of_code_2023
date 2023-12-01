import fs from 'fs';
import { program } from 'commander';

program
  .option('-f, --file <file>');

program.parse();

const options = program.opts();

const input = fs.readFileSync(`./${options.file}`, { encoding: 'utf8' });

const reverse = (str) => str.split("").reverse().join("");

export {
  options,
  input,
  reverse
}