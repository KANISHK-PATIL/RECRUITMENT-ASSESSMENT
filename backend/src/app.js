const express = require('express');
const cors = require('cors');
const app = express();
const { swaggerUi, swaggerSpec } = require('./swagger');

const aptitudeRoute = require("./routes/aptitude.route");
const encryptedRoute = require("./routes/encrypted.route");
const memoryRoute = require("./routes/memory.route");
const reportRoute = require("./routes/report.route");
const leaderboardRoute = require("./routes/leaderboard.route");
const memorySequenceRoute = require("./routes/memorySequence.route");

app.use(express.json());
app.use(cors());

app.use("/api/aptitude", aptitudeRoute);

app.use("/api/encrypted", encryptedRoute);

app.use("/api/memory", memoryRoute);

app.use("/api/report", reportRoute);

app.use("/api/leaderboard", leaderboardRoute);

app.use("/api/memory-sequence", memorySequenceRoute);

module.exports = app;

