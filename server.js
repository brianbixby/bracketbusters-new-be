"use strict";

require('dotenv').config();
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes/allRoutes');
const cors = require('cors');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
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