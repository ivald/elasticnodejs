const controller = require('./search.controller');
const express = require('express');
const router = express.Router();

router.get('/vt', controller.vehicles_test);
//router.get('/cit', controller.createInventoryTypeIndex);

module.exports = router;
