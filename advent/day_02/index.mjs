
// node index.1.mjs --file input.1.test.txt

import { options, input } from '../common.mjs'

const games = input.split("\n")
  .map(line => line.split(": ")[1])
  .map(line => line.split('; ')
    .map(set => set.split(', ')
      .map(c => c.split(' ')))
    .map(set => set.reduce(
      (a, i) => Object.assign(a, { [i[1]]: parseInt(i[0])}), {}))
  )

const check = (games, red, green, blue) => {
  return games.map((game, i) => {
    const r = game.filter(set => set.red > red).length
    const g = game.filter(set => set.green > green).length
    const b = game.filter(set => set.blue > blue).length
    return r || g || b ? 0 : i + 1
  })
  .reduce((a, i) => a + i, 0)
}

// 12 red cubes, 13 green cubes, and 14 blue cubes.
console.log('Part 1', check(games, 12, 13, 14))

const power = (games, red, green, blue) => {
  return games.map((game, i) => {
    const max = {red: 0, green: 0, blue: 0}
    game.forEach(set => {
      max.red = Math.max(set.red || 0, max.red)
      max.green = Math.max(set.green || 0, max.green)
      max.blue = Math.max(set.blue || 0, max.blue)
    });
    return max
  }).map(game => game.red * game.green * game.blue)
  .reduce((a, i) => a + i, 0)
} 

console.log('Part 2', power(games))