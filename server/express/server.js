const express = require("express");
const cors = require("cors");
const pg = require("pg");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");
dayjs.locale("ja");
// require("dotenv").config();

const app = express();

const pool = new pg.Pool({
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
})


app.use(cors({
    origin: "http://localhost:5173",
    // origin: "0.0.0.0"
}));

app.get("/map", function (req, res) {
    const { start, end } = req.query;

    const startDate = dayjs.tz(start, "Asia/Tokyo").utc().format("YYYY-MM-DDTHH:mm:ss");
    const endDate = dayjs.tz(end, "Asia/Tokyo").utc().format("YYYY-MM-DDTHH:mm:ss");

    const sql = {
        text: "SELECT * FROM " + process.env.DB_TABLE + " WHERE timestamp BETWEEN $1 AND $2 ORDER BY timestamp ASC",
        values: [startDate, endDate]
    }
    console.log("Querying map data:", sql.values);
    pool.connect(function (err, client) {
        if (err) {
            console.log(err);
            res.status(500).send("DB connection error");
        } else {
            client
                .query(sql)
                .then((result) => {
                    console.log("Query result count:", result.rows.length);
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
