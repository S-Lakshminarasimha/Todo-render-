const express = require('express')
const router = express.Router()
const passport = require('passport')
const userController = require('../controllers/userController')
const profileController = require('../controllers/profileController')
router.get('/',passport.checkAuthentication,userController.profile)

router.post('/createTask',profileController.createTask)
router.get('/deleteTask/:task_id/:zone',profileController.deleteTask)
router.get('/moveData/:task_id/:dst_zone/:cur_zone', profileController.moveData);
module.exports = router