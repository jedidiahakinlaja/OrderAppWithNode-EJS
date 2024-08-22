const express = require('express');
const route = express.Router();
const userController = require('../controller/auth');
const cartController = require("../controller/shoppingCart")
const purchaseController = require("../controller/purchase")
route.post('/register',userController.postRegister);
route.post('/login',userController.postLogin);
route.use('/logout',userController.logOut);
route.use('/profile',userController.postProfile);
route.use('/addUser',userController.addUser);
route.use('/select', userController.select);
route.use('/quickPurchase',cartController.getCartDash)

//cart
route.post('/postCart',cartController.postCart);
route.get('/getDetail',cartController.getCart)
route.get('/getDetails/:locId', cartController.getCartId);
route.delete('/delete_user/:dast',cartController.DeletetCartId);
route.put('/update_user/:ids', cartController.putCartId);
route.use('/quickPurchase',cartController.getCartDash)
//Purchase

route.post('/purchase',purchaseController.postPurchase);
route.get('/purchaseList',purchaseController.getPurchase);

module.exports = route;