'use strict'

module.exports = wit

function wit (dest, fn) {
  const write = dest.write.bind(dest)
  dest.write = (str) => write(fn(str))
  return dest
}
