const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addThoughtReaction,
  updateThoughtReaction,
  removeThoughtReaction,
} = require('../../controllers/mindController');

router
    .route('/')
    .get(getThoughts)
    .post(createThought);

router
  .route('/:tid')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

router
    .route('/:tid/reactions')
    .post(addThoughtReaction);

router
    .route('/:tid/reactions/:rid')
    .put(updateThoughtReaction)
    .delete(removeThoughtReaction);

module.exports = router;
