const router = require('express').Router();
const answersController = require('../../controller/lessonsAndQ/answers.js');

// Get all answers
router.get("/", answersController.getAllAnswers);

// Get a specific answer by ID
router.get("/:id", answersController.getOneAnswer);

// Add a new answer
router.post("/add", answersController.addAnswer);

// Update an answer by ID
router.put("/update/:id", answersController.updateAnswer);

// Delete an answer by ID
router.delete("/delete/:id", answersController.deleteAnswer);

module.exports = router;
