const router = require('express').Router();
const lessonsController = require('../../controller/lessonsAndQ/lessons.js');

// Get all lessons
router.get("/", lessonsController.getAllLessons);

// Get a specific lesson by ID
router.get("/:id", lessonsController.getOneLesson);

// Add a new lesson
router.post("/add", lessonsController.addLesson);

// Update a lesson by ID
router.put("/update/:id", lessonsController.updateLesson);

// Delete a lesson by ID
router.delete("/delete/:id", lessonsController.deleteLesson);

module.exports = router;
