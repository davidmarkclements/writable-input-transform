'use strict'

const wit = require('.')
const fs = require('fs')
const bench = require('fastbench')
const stream = fs.createWriteStream('/dev/null')
const boom = require('sonic-boom')('/dev/null')
const wrappedStream = wit(
  stream,
  (str) => str.replace(/test/, 'replaced')
)
const wrappedBoom = wit(
  boom,
  (str) => str.replace(/test/, 'replaced')
)
const max = 1000

const run = bench([
  function streamWrite (cb) {
    for (var i = 0; i < max; i++) {
      stream.write('test')
    }
    setImmediate(cb)
  },
  function wrappedStreamWrite (cb) {
    for (var i = 0; i < max; i++) {
      wrappedStream.write('test')
    }
    setImmediate(cb)
  },
  function sonicBoomWrite (cb) {
    for (var i = 0; i < max; i++) {
      boom.write('test')
    }
    setImmediate(cb)
  },
  function wrappedBoomWrite (cb) {
    for (var i = 0; i < max; i++) {
      wrappedBoom.write('test')
    }
    setImmediate(cb)
  }
], 1000)

run(run)
