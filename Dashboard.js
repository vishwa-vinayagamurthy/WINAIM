// dashboard.js (controller)
const express = require('express');
const router = express.Router();
const Customer = require('./customer.model');
const Interaction = require('./interaction.model');
const Opportunity = require('./opportunity.model');

router.get('/', async (req, res) => {
  const customers = await Customer.find().exec();
  const interactions = await Interaction.find().exec();
  const opportunities = await Opportunity.find().exec();

  const keyMetrics = {
    numOpportunities: opportunities.length,
    opportunitiesByStage: opportunities.reduce((acc, opp) => {
      acc[opp.stage] = (acc[opp.stage] || 0) + 1;
      return acc;
    }, {}),
    customerInteractionHistory: interactions.reduce((acc, interaction) => {
      acc[interaction.type] = (acc[interaction.type] || 0) + 1;
      return acc;
    }, {}),
    salesPerformanceMetrics: {
      conversionRate: (opportunities.filter(opp => opp.stage === 'Closed Won').length / opportunities.length) * 100,
      salesVelocity: opportunities.reduce((acc, opp) => acc + opp.value, 0) / opportunities.length
    }
  };

  res.json(keyMetrics);
});

module.exports = router;
