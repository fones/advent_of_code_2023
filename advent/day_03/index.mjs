
// node index.mjs --file input.test.txt

import { options, input } from '../common.mjs'

const table = input.split('\n').map(line => Array.from(line))

const width = table[0].length
const heigh = table.length

const isSymbol = (e) => isNaN(parseInt(e)) && e != '.'
const isDigit = (e) => !isNaN(parseInt(e))

const removeNumber = (h,w) => {
  if (h >= 0 && h < heigh && w >= 0 && w < width) {
    const e = table[h][w]
    if (isDigit(e)) {
      table[h][w] = '.'
      removeNumber(h, w+1)
      removeNumber(h, w-1)
    }
  }
}

const checkDigit = (h,w) => {
  table[h][w] = '.'
  for (let j = h - 1; j <= h + 1; j++) {
    for(let i = w - 1; i <= w + 1; i++ ) {
      if (i >= 0 && i <= width && j >= 0 && j < heigh) {
        const n = table[j][i]
        // console.log(h, w, j,i)
        if (isDigit(n)) {
          removeNumber(j, i)
        }
      }
    }
  }
}

const sumAllNumbers = (table) => {
  return table
    .map(line => line.join(''))
    .map(line => line.match(/\d+/g))
    .filter(l => l)
    .reduce((a, i) => a.concat(i), [])
    .map(a => parseInt(a))
    .reduce((a, i) => a + i, 0)
}

const partOne = () => {
  const all = sumAllNumbers(table)
  // console.log(all)

  for(let h = 0; h < heigh; h++) {
    for (let w = 0; w < width; w++) {
      const e = table[h][w];
      if (isSymbol(e)) {
        // console.log(e, h, w)
        checkDigit(h, w)
      }
    }
  }
  // console.log(table.map(line => line.join('')).join('\n'))

  const rest = sumAllNumbers(table)
  // console.log(rest)
  console.log('Part One', all - rest)
}

// Run part One or part Two
// partOne();

const isOnMap = (h, w) => (h >= 0 && h <= heigh && w >= 0 && w < width)

const getLeftNumber = (h, w) => {
  if (isOnMap(h, w) && isDigit(table[h][w])) {
    return getLeftNumber(h, w - 1) + table[h][w]
  } else {
    return ''
  }
}

const getRightNumber = (h, w) => {
  if (isOnMap(h, w) && isDigit(table[h][w])) {
    return table[h][w] + getRightNumber(h, w + 1)
  } else {
    return ''
  }
}

const getNumber = (h, w) => {
  if (isOnMap(h, w) && isDigit(table[h][w])) {
    return getLeftNumber(h, w - 1) + table[h][w] + getRightNumber(h, w + 1) 
  } else {
    return null;
  }
}

const findAllNumbers = (h, w) => {
  const numbers = []
  // left
  numbers.push(getNumber(h, w - 1))
  // right
  numbers.push(getNumber(h, w + 1))
  // if top is empty, check left and right
  if(isDigit(table[h - 1][w])) {
    numbers.push(getNumber(h - 1, w))
  } else {
    numbers.push(getNumber(h - 1, w - 1))
    numbers.push(getNumber(h - 1, w + 1))
  }

  if(isDigit(table[h + 1][w])) {
    numbers.push(getNumber(h + 1, w))
  } else {
    numbers.push(getNumber(h + 1, w - 1))
    numbers.push(getNumber(h + 1, w + 1))
  }

  return numbers.filter(e => e).map(i => parseInt(i))
}

const partTwo = () => {
  let sum = 0
  for(let h = 0; h < heigh; h++) {
    for (let w = 0; w < width; w++) {
      const e = table[h][w];
      if (isSymbol(e) && e === '*') {
        const n = findAllNumbers(h, w)
        if (n.length == 2) {
          // console.log(e, h, w, n)
          sum += n[0] * n[1]
        }
        // check if there are 2 numbers
      }
    }
  }
  console.log('Part Two', sum)
}

// Run part One or part Two
partTwo();