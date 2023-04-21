# each-stream

![Last version](https://img.shields.io/github/tag/Kikobeats/each-stream.svg?style=flat-square)
[![Coverage Status](https://img.shields.io/coveralls/Kikobeats/each-stream.svg?style=flat-square)](https://coveralls.io/github/Kikobeats/each-stream)
[![NPM Status](https://img.shields.io/npm/dm/each-stream.svg?style=flat-square)](https://www.npmjs.org/package/each-stream)

> Iterate all the data in a stream with async and concurrency support.

## Install

```bash
$ npm install each-stream --save
```

## Usage

```js
const each = require('each-stream')

const stream = await db.users.find({}, { stream: true })

await each(stream, async user => {
  const stats = await stats.retrieve(user.id)
  return sendEmail(user.id, stats)
}, { concurrency: 10 })
```

## API

### each(stream, fn, [options])

#### stream

*Required*<br>
Type: `object`

The Readable stream to iterate.

#### fn

*Required*<br>
Type: `function`

The async function to invoke per every iteration.

#### options

##### concurrency

Type: `number`<br>
Default: `Number.MAX_SAFE_INTEGER`

The maximum concurrency allowed.

##### waiting

Type: `number`<br>
Default: `100`

The quantity of time to wait until check if concurrency changed.

## License

**each-stream** © [Kiko Beats](https://kikobeats.com), released under the [MIT](https://github.com/Kikobeats/each-stream/blob/master/LICENSE.md) License.<br>
Authored and maintained by [Kiko Beats](https://kikobeats.com) with help from [contributors](https://github.com/Kikobeats/each-stream/contributors).

> [kikobeats.com](https://kikobeats.com) · GitHub [Kiko Beats](https://github.com/Kikobeats) · Twitter [@Kikobeats](https://twitter.com/Kikobeats)
