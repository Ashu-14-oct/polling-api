const express = require('express');
const router = express.Router();
const questionController = require('../controllers/quesions_controller');


router.post('/questions/create', questionController.create);
router.delete('/questions/:id/delete',questionController.delete);
router.delete('/options/:id/delete', questionController.deleteOption);
router.put('/options/:id/add_vote', questionController.addVotes);
router.get('/questions/:id', questionController.view);



module.exports = router;