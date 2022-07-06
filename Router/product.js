const express = require('express');
const router = express.Router();

const {create , productById, read, remove, update, list ,listRelated ,listCategories, listBySearch, photo, listSearch}=require('../Controllers/product');
const { userById } = require('../Controllers/user');
const { isAuth , isAdmin }= require('../Controllers/auth')




router.post('/product/create/:userId',isAuth,isAdmin,create);
router.get('/product/:productId',read);
router.delete('/product/:productId/:userId',isAuth,isAdmin, remove);
router.put('/product,:productId/:userId',isAuth,isAdmin, update)
router.get('/products',list);
router.get("/products/search", listSearch);
router.get("/products/related/:productId", listRelated);
router.get("/products/categories", listCategories);
router.post("/products/by/search", listBySearch); 
router.get('/fortest',(req,res)=>{
    res.json({
        user:"mohit"
    })
})


router.get("/product/photo/:productId", photo);






router.param('productId',productById);

router.param('userId',userById);


module.exports = router;

