'use strict'

const SonicBoom = require('sonic-boom')
const wit = require('../..')

const original = new SonicBoom(process.stdout.fd)
const dest = wit(original, (str) => str.replace(/test/, 'replaced'))

dest.write('test')
