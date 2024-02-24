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
  .route('/:_id')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

router
    .route('/:_id/reactions')
    .post(addThoughtReaction);

router
    .route('/:_id/reactions/:reactionId')
    .put(updateThoughtReaction)
    .delete(removeThoughtReaction);

module.exports = router;
