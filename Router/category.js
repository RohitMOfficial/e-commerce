const express = require('express');
const router = express.Router();

const { create, categoryById, read, update, remove, list } = require('../Controllers/category')
const { userById } = require('../Controllers/user');
const { isAuth, isAdmin } = require('../Controllers/auth')





router.post('/category/create/:userId', isAuth, isAdmin, create);
router.get('/category/:categoryId', read);

router.put('/category/:categoryId/:userId', isAuth, isAdmin, update);

router.delete('/category/:categoryId/:userId', isAuth, isAdmin, remove);
router.get('/categories', list);



router.param('categoryId', categoryById);

router.param('userId', userById);


module.exports = router;

