const router = require('express').Router();
const apiRoutes = require('./apiRoutes');

router.use('/user', apiRoutes);

module.exports = router;