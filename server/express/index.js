const express = require('express')
const app = express()

/**
 * サーバ起動
 */
const server = app.listen(8000, function () {
    console.log('🚀 app started. port:' + server.address().port)
})

/**
 * GET /test
 */
app.get('/test', async function (req, res, next) {
    console.log('/test called')
    res.send('/test called')
})
