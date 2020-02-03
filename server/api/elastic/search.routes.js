const controller = require('./search.controller');
const express = require('express');
const router = express.Router();

router.get('/', controller.main);

module.exports = router;
