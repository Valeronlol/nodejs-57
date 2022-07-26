const { isNumber, get } = require('lodash')
const fs = require('fs')

module.exports = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack)
  }

  const code = get(err, 'code', 500)
  const date = (new Date()).toISOString()
  const message = `Datetime ${date}.\nError message: ${err.message}.\nStack trace: ${err.stack}.\nStatus code: ${code}.\n\n`

  fs.appendFile(`${process.env.LOGS_PATH}/error.log`, message, (err) => {
    if (err) {
      console.error(err)
    }
  })

  res
    .status(isNumber(err.code) ? err.code : 500)
    .send({
      code,
      message: err.message,
    })
}
