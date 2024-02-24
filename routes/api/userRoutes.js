const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  unFriend,
} = require('../../controllers/userController');

router
    .route('/')
    .get(getUsers)
    .post(createUser);

router
    .route('/:uuid')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

router
    .route('/:uuid/friends/:fid')
    .post(addFriend)
    .delete(unFriend);

module.exports = router;