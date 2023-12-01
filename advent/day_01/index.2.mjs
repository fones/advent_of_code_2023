import { options, input } from '../common.mjs'

const rep = {
  'one': '1',
  'two': '2',
  'three': '3',
  'four': '4',
  'five': '5',
  'six': '6',
  'seven': '7',
  'eight': '8',
  'nine': '9',
}

const rx = new RegExp('(' + Object.keys(rep).join('|') + ')', 'g')

console.log(rx)

// TODO: Do not replace all, but just first and last spelled digits

const res = input
  .split('\n')
  .map(line => line.replace(rx, (match) => rep[match]))
  .map(line => Array.from(line)
     .map(c => parseInt(c))
     .filter(c => !isNaN(c)))
  .map(row => [row[0], row[row.length - 1]])
  .map(row => row[0] * 10 + row[1])
  .reduce((a, i) => a + i, 0)

console.log(res)