const express =require('express');
const {handleGetAlluser,handlegetUserByID, handleUpdateUserByID, handleDeleteUserByID, handleCreateUser} = require('../controllers/user')
const router = express.Router();

router.get('/',handleGetAlluser)
router.get('/:id',handlegetUserByID);
router.patch('/:id',handleUpdateUserByID)
router.delete('/:id',handleDeleteUserByID);
router.post('/',handleCreateUser)

module.exports = router;