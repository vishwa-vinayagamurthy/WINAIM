// interactions.js (model)
const mongoose = require('mongoose');

const interactionSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  type: String,
  date: Date,
  description: String
});

const Interaction = mongoose.model('Interaction', interactionSchema);

// interactions.js (controller)
const express = require('express');
const router = express.Router();
const Interaction = require('./interaction.model');

router.post('/', async (req, res) => {
  const interaction = new Interaction(req.body);
  await interaction.save();
  res.json(interaction);
});

router.get('/:customer_id', async (req, res) => {
  const interactions = await Interaction.find({ customer: req.params.customer_id }).exec();
  res.json(interactions);
});

module.exports = router;
