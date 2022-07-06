const express = require('express');
const router = express.Router();

const {  isAuth, isAdmin } = require('../controllers/auth');

const { userById, read, update, purchaseHistory } = require('../controllers/user');

router.get('/secret',  (req, res) => {
    res.json({
        user: 'got here yay'
    });
});

router.get('/user/:userId',  isAuth, read);
router.put('/user/:userId', isAuth, update);
router.get('/orders/by/user/:userId', isAuth, purchaseHistory);

router.param('userId', userById);

module.exports = router;