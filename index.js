'use strict'

const each = (
  stream,
  fn,
  { concurrency = Number.MAX_SAFE_INTEGER, waiting = 100 } = {}
) => {
  const end = stream.readable ? 'end' : 'finish'
  return new Promise((resolve, reject) => {
    let free = concurrency

    const shouldResolve = () => {
      return !stream.isPaused() && free === concurrency
        ? resolve()
        : setTimeout(shouldResolve, waiting)
    }

    stream
      .on('data', async data => {
        if (--free === 0) stream.pause()
        await fn(data)
        if (++free === 1) stream.resume()
      })
      .on(end, shouldResolve)
      .on('error', reject)
  })
}

each.series = (stream, fn, opts) =>
  each(stream, fn, { concurrency: 1, ...opts })

module.exports = each
