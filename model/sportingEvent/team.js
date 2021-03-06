'use strict';

const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  teamName: { type: String, required: true, unique: true},
  teamCity: { type: String, required: true },
  image: { type: String, required: true },
  color: { type: String, required: true },
  pretournamentRecord:{ type: String, required: true },
  sportingEventID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'sportingEvent' },
  wins: {type: Number, default: 0 },
  losses: {type: Number, default: 0 },
  seed: Number,
  createdOn: { type: Date, default: Date.now },
  starPlayer: String,
  starPlayerImage: String,
  tags: [ String ],
});

module.exports = mongoose.model('team', teamSchema);