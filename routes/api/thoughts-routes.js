const router = require('express').Router();
const {
    addThoughts,
    getAllThoughts,
    getThoughtsById,
    updateThoughts,
    deleteThoughts,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughts-controller');

router
    .route('/').get(getAllThoughts);

module.exports = router;