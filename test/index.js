'use strict'
const { spawnSync } = require('child_process')
const { Writable } = require('stream')
const { test } = require('tap')
const wit = require('..')

test('transforms strings passed to write method based on return value of supplied function', ({is, end}) => {
  const original = {
    write (str) {
      is(str, 'replaced')
    }
  }
  const dest = wit(original, (str) => str.replace(/test/, 'replaced'))
  dest.write('test')
  end()
})

test('preserves original write method context', ({is, doesNotThrow, end}) => {
  const original = {
    _write (str) {
      is(str, 'replaced')
    },
    write (str) {
      this._write(str)
    }
  }

  const dest = wit(original, (str) => str.replace(/test/, 'replaced'))

  doesNotThrow(() => dest.write('test'))
  end()
})

test('compatible with node streams', ({is, doesNotThrow, end}) => {
  const original = new Writable({
    write (str) {
      is(str + '', 'replaced')
    }
  })
  const dest = wit(original, (str) => str.replace(/test/, 'replaced'))
  doesNotThrow(() => dest.write('test'))
  end()
})

test('compatible with sonic-boom', ({is, doesNotThrow, end}) => {
  const { stdout } = spawnSync(process.argv[0], [require.resolve('./fixtures/sonic-boom')])
  is(stdout + '', 'replaced')
  end()
})
