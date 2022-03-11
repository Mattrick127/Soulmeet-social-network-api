const router = require('express').Router();
const path = require('path');

router.get('/user', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/user.html'));
});

module.exports = router;