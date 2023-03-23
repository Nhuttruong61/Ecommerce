const express = require("express");
const { createUser, loginUserCtrl, getAllUser, getaUser, deleteaUser, updateUser } = require("../controller/userCtrl");
const {authMiddleware, isAdmin} = require("../middlewares/authMiddleware")
const router = express.Router();

router.post('/register',createUser);
router.post('/login', loginUserCtrl);
router.get('/all-users',getAllUser)
router.get('/:id',authMiddleware,isAdmin, getaUser)
router.delete('/:id', deleteaUser)
router.put('/edit-user',updateUser)

module.exports = router;