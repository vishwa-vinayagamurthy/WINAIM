// opportunities.js (model)
const mongoose = require('mongoose');

const opportunitySchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  name: String,
  description: String,
  stage: String,
  closeDate: Date
});

const Opportunity = mongoose.model('Opportunity', opportunitySchema);

// opportunities.js (controller)
const express = require('express');
const router = express.Router();
const Opportunity = require('./opportunity.model');

router.post('/', async (req, res) => {
  const opportunity = new Opportunity(req.body);
  await opportunity.save();
  res.json(opportunity);
});

router.get('/:customer_id', async (req, res) => {
  const opportunities = await Opportunity.find({ customer: req.params.customer_id }).exec();
  res.json(opportunities);
});

module.exports = router;
