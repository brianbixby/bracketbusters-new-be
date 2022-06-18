"use strict";

require('dotenv').config();
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes/allRoutes');
const cors = require('cors');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const whitelist = [process.env.WHITELIST, process.env.WHITELIST1, process.env.WHITELIST2, process.env.WHITELIST3 ];
// const whitelist = ['http://localhost:3000', 'http://localhost:3000/', 'http://www.localhost:3000/', 'http://www.localhost:3000'];

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