#  fast-transform

Transform the input on writable objects such 
as Node write streams and [sonic-boom](http://npm.im/sonic-boom) instances.

## Installation

```sh
npm install  --save
```

## Usage

```js
const SonicBoom = require('sonic-boom')
const wit = require('writable-input-transform')

const original = new SonicBoom(process.stdout.fd)
const dest = wit(original, (str) => str.replace(/test/, 'replaced'))

dest.write('test')
// => replaced
```

## Benchmarks

Benchmarks show overhead of approach is within noise. 

```js
streamWrite*1000: 434.452ms
wrappedStreamWrite*1000: 423.111ms
sonicBoomWrite*1000: 86.468ms
wrappedBoomWrite*1000: 82.720ms
```

## Dependencies

None

## Dev Dependencies

None

## Licence

MIT

