// Generate by Gemini 3
/*
  *** For Debug! ***
  Daily City Route Generator
  - Generates data for the last 7 days.
  - Each day corresponds to a different city.
  - 5 points per day.
  - Time range: 12:00 - 13:00.
*/

const pg = require("pg");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");

// Try to load dotenv, but ignore errors if not found
try {
    require("dotenv").config({ path: "../.env" });
} catch (e) {
    // console.log("dotenv not loaded");
}

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

const pool = new pg.Pool({
    database: process.env.DB_NAME || process.env.POSTGRES_DB || 'biketracker',
    user: process.env.DB_USER || process.env.POSTGRES_USER || 'nishima',
    password: process.env.DB_PASS || process.env.POSTGRES_PASSWORD,
    host: process.env.DB_HOST || 'db',
    port: process.env.DB_PORT || 5432
});

const table = process.env.DB_TABLE || 'locations';

const CITIES = [
    { name: "Tokyo", lat: 35.6895, lng: 139.6917 },
    { name: "Sapporo", lat: 43.0618, lng: 141.3545 },
    { name: "Sendai", lat: 38.2682, lng: 140.8694 },
    { name: "Yokohama", lat: 35.4437, lng: 139.6380 },
    { name: "Nagoya", lat: 35.1815, lng: 136.9066 },
    { name: "Osaka", lat: 34.6937, lng: 135.5023 },
    { name: "Fukuoka", lat: 33.5902, lng: 130.4017 }
];

function getRandomInRange(base, range) {
    return base + (Math.random() - 0.5) * range;
}

function generateData() {
    const data = [];

    // Generate data for the last 7 days
    for (let i = 0; i < 7; i++) {
        const city = CITIES[i % CITIES.length]; // Cycle through cities
        const dateBase = dayjs().subtract(i, 'day');

        console.log(`Day ${i}: ${dateBase.format('YYYY-MM-DD')} in ${city.name}`);

        for (let j = 0; j < 5; j++) {
            // Random time between 12:00 and 13:00
            const minute = Math.floor(Math.random() * 60);
            const second = Math.floor(Math.random() * 60);

            const time = dateBase
                .hour(12)
                .minute(minute)
                .second(second);

            // Random location around city center (within ~5km)
            // 0.05 deg \u2248 5.5km
            const lat = getRandomInRange(city.lat, 0.05);
            const lng = getRandomInRange(city.lng, 0.05);

            data.push({ time, lat, lng });
        }
    }

    // Sort by time
    return data.sort((a, b) => a.time.valueOf() - b.time.valueOf());
}

async function seed() {
    try {
        console.log(`Connecting to DB... table: ${table}`);
        const client = await pool.connect();

        const data = generateData();

        console.log(`Inserting ${data.length} records...`);
        for (const d of data) {
            const timestamp = d.time.toISOString();
            const query = {
                text: `INSERT INTO ${table} (timestamp, latitude, longitude) VALUES ($1, $2, $3)`,
                values: [timestamp, d.lat, d.lng]
            };
            await client.query(query);
        }

        console.log("Done!");
        client.release();
    } catch (err) {
        console.error("Error seeding data:", err);
    } finally {
        await pool.end();
    }
}

seed();
