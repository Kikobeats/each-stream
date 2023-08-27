'use strict'

const each = (
  stream,
  fn,
  { concurrency = Number.MAX_SAFE_INTEGER, waiting = 100 } = {}
) => {
  return new Promise((resolve, reject) => {
    let slots = concurrency

    const shouldResolve = () => {
      return !stream.isPaused() && slots === concurrency
        ? resolve()
        : setTimeout(shouldResolve, waiting)
    }

    stream
      .on('data', async data => {
        if (--slots === 0) stream.pause()
        await fn(data)
        if (++slots === 1) stream.resume()
      })
      .on('end', shouldResolve)
      .on('error', reject)
  })
}

each.series = (stream, fn, opts) =>
  each(stream, fn, { concurrency: 1, ...opts })

module.exports = each
