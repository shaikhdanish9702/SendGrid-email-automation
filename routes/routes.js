const express = require('express');
const { registerUser, LoginUser, resetAgent_Password} = require('../controller/controller');
const routes = express.Router();


routes.post('/registerUser',registerUser)
routes.post('/loginUser',LoginUser)
routes.put('/resetAgent_Password',resetAgent_Password)

module.exports={ routes}