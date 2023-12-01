import { options, input, reverse} from '../common.mjs'

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

// reverse
const repr = Object.keys(rep).reduce((a, k) => Object.assign(a, { [reverse(k)]: rep[k] }), {})

// console.log(repr)

const rx = new RegExp('(' + Object.keys(rep).join('|') + ')', '')

const rxr = new RegExp('(' + Object.keys(repr).join('|') + ')', '')

// console.log(rx)
// console.log(rxr)

const res = input
  .split('\n')
  .map(line => [
    line,
    reverse(line)
  ])
  .map(([n, r]) => [
    n.replace(rx, (match) => rep[match]),
    r.replace(rxr, (match) => repr[match])
  ])
  .map(([n, r]) => [
    Array.from(n).map(c => parseInt(c)).filter(c => !isNaN(c)),
    Array.from(r).map(c => parseInt(c)).filter(c => !isNaN(c))
  ])
  .map(([n, r]) => [n[0], r[0]])
  .map(row => row[0] * 10 + row[1])
  .reduce((a, i) => a + i, 0)

console.log(res)