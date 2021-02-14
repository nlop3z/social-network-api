const router = require('express').Router();
// Imports all of the API routes from /api/index.js
const thoughtRoutes = require('./thought-routes');
const userRoutes = require('./user-routes');

// adds the prefix of `/api` to all of the api routes imported from the `api` directory
router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router;