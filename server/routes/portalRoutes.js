const express = require('express');

const {
  getPortalInfo,
} = require('../controllers/portalController');

const router = express.Router();

router.get('/info', getPortalInfo);

module.exports = router;