const express = require('express');
const router = express.Router();
const cron = require('node-cron');
 
// cron.schedule('*/2 * * * *', () => {
//   console.log('running a task every two minutes');
// });

module.exports= router;