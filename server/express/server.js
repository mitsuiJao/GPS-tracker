const express = require("express");
const cors = require("cors");
const pg = require("pg");
// require("dotenv").config();

const app = express();

const pool = new pg.Pool({
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
})

const sql = {
    text: "SELECT * FROM " + process.env.DB_TABLE,
    // text: "SELECT * FROM $1 WHERE timestamp BETWEEN $2 AND $3",
    // value: [process.env.DB_TABLE]
}

app.use(cors({
    origin: "http://localhost:5173",
    // origin: "0.0.0.0"
}));

app.get("/map", function(req, res) {
    pool.connect(function (err, client) {
        if (err) {
            console.log(err);
            res.status(500).send("DB connection error");
        } else {
            client
                .query(sql)
                .then((result) => {
                    res.status(200).json(result.rows);
                })
                .catch((e) => {
                    console.error(e.stack);
                    res.status(500).send("DB query error");
                })
                .finally(() => {
                    client.release();
                })
        }
    })
})

/**
 * GET /test
 */
app.get('/test', async function (req, res, next) {
    console.log('/test called')
    res.send('/test called')
})


/**
 * サーバ起動
 */
const server = app.listen(8000, function () {
    console.log('🚀 app started. port:' + server.address().port)
})
