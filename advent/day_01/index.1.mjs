import { options, input } from '../common.mjs'

const res = input
  .split('\n')
  .map(line => Array.from(line)
    .map(c => parseInt(c))
    .filter(c => !isNaN(c)))
  .map(row => [row[0], row[row.length - 1]])
  .map(row => row[0] * 10 + row[1])
  .reduce((a, i) => a + i, 0)

console.log(res)