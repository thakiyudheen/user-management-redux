var express = require('express');
const adminController = require('../Controller/adminController');
var router = express.Router();

/* GET home page. */
router.post('/EditName',adminController.EditName)
// delete user------------------------------------
router.post('/deleteUser',adminController.deleteUser)
// get search------------------------------------
router.get('/getSearch',adminController.getSearch)
module.exports = router;
