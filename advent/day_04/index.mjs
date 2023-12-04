
// node index.mjs --file input.test.txt

import { options, input } from '../common.mjs'

import _ from 'lodash'


const partOne = input.split('\n')
  .map(line => line.split(': ')[1].split(' | '))
  .map(line => [
    line[0].match(/\d+/g).map(e => parseInt(e)),
    line[1].match(/\d+/g).map(e => parseInt(e))
  ])
  .map(([a1, a2]) => _.intersection(a1, a2))
  .filter(a => a.length)
  .map(com => 2**(com.length-1))
  .reduce((a, i) => a + i, 0)

console.log('PART ONE', partOne)

const table = input.split('\n')
  .map(line => line.split(': ')[1].split(' | '))
  .map(line => [
    line[0].match(/\d+/g).map(e => parseInt(e)),
    line[1].match(/\d+/g).map(e => parseInt(e))
  ])
  .map(([a1, a2]) => _.intersection(a1, a2))
  .map((a, i) => ({id: i, match: a.length}))

for(let i = 0; i < table.length; i++) {
  const r = table[i]
  table.push(...table.slice(r.id + 1, r.id + 1 + r.match))
}

console.log('PART TWO', table.length)
