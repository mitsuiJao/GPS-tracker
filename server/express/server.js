const express = require("express");
const cors = require("cors");
const { Client } = require("pg");
require("dotenv").config();

const app = express();
const port = 3001;

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_HOST,
    port: process.env.DB_PORT
})

const sql = {
    text: "SELECT * FROM $1 WHERE timestamp BETWEEN $2 AND $3",
    value: [process.env.DB_TABLE]
}

client.connect()

app.use(cors({
    origin: "http://localhost:5173"
}));

app.get()