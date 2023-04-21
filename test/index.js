'use strict'

const { Duplex, Readable } = require('node:stream')
const test = require('ava')
const each = require('..')

test('Readable', async t => {
  const n = 100
  const input = [...Array(n).keys()]
  const readable = Readable.from(input)

  const output = []
  let ended = false

  readable.on('end', () => (ended = true))
  await each.series(readable, output.push.bind(output))

  t.true(ended)
  t.deepEqual(input, output)
})

test('Duplex', async t => {
  const n = 100
  const input = [...Array(n).keys()]
  const readable = Duplex.from(input)

  const output = []
  let ended = false

  readable.on('end', () => (ended = true))
  await each.series(readable, output.push.bind(output))

  t.true(ended)
  t.deepEqual(input, output)
})
