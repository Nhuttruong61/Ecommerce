const express = require('express');
const { createUser, loginUserCtrl, getAllUser, getaUser, deleteaUser, updateUser } = require('../controller/userCtrl');
const router = express.Router();
router.post('/register',createUser);
router.post('/login', loginUserCtrl);
router.get('/all-users',getAllUser)
router.get('/:id', getaUser)
router.delete('/:id', deleteaUser)
router.put('/:id',updateUser)

module.exports = router;