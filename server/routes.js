const express = require('express');
const { createUser,loginUser,getUsers,updateUser } = require('./controller');

const router = express.Router();

router.post('/create', createUser);
router.post('/login',loginUser);
router.get('/getusers',getUsers);
router.put('/update/:id',updateUser);

module.exports = router;
