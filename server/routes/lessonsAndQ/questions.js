const router = require('express').Router();
const questionsController = require('../../controller/lessonsAndQ/questions.js');

// Get all questions
router.get("/", questionsController.getAllQuestions);

// Get a specific question by ID
router.get("/:id", questionsController.getOneQuestion);

// Add a new question
router.post("/add", questionsController.addQuestion);

// Update a question by ID
router.put("/update/:id", questionsController.updateQuestion);

// Delete a question by ID
router.delete("/delete/:id", questionsController.deleteQuestion);

module.exports = router;
