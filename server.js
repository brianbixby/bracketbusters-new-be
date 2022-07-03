"use strict";

require('dotenv').config();
const compression = require('compression');
const express = require('express');
const cors = require('cors');
const db = require('./config/connection');
const routes = require('./routes/allRoutes');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const whitelist = [process.env.WHITELIST, process.env.WHITELIST1, process.env.WHITELIST2];
app.use(cors({
    credentials: true,
    origin: (origin, cb) => {
        if (whitelist.indexOf(origin) != -1 || origin === undefined) {
            cb(null, true);
        } else {
            cb(new Error(`${origin} Not allowed by CORS`));
        }
    },
}));

app.use(routes);

db.once('open', (err, resp) => {
	if (err) {
		console.log("*** db connection err: ***", err);
	} else {
		app.listen(PORT, () => {
			console.log(`API server running on port ${PORT}!`);
		});
	}
});