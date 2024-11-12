const lessonModel = require('../model/lesson.js');

// Get all lessons
const getAllLessons = function (req, res) {
    lessonModel.getAllLessons((err, result) => {
        if (err) { res.send(err); }
        else { res.send(result); }
    });
};

// Get one lesson by ID
const getOneLesson = function (req, res) {
    lessonModel.getOneLesson(req.params.id, (err, result) => {
        if (err) { res.send(err); }
        else { res.send(result); }
    });
};

// Add a new lesson
const addLesson = function (req, res) {
    lessonModel.addLesson(req.body, (err, result) => {
        if (err) { res.send(err); }
        else { res.send(result); }
    });
};

// Update a lesson by ID
const updateLesson = function (req, res) {
    lessonModel.updateLesson(req.params.id, req.body, (err, result) => {
        if (err) { res.send(err); }
        else { res.send(result); }
    });
};

// Delete a lesson by ID
const deleteLesson = function (req, res) {
    lessonModel.deleteLesson(req.params.id, (err, result) => {
        if (err) { res.send(err); }
        else { res.send(result); }
    });
};

module.exports = {
    getAllLessons,
    getOneLesson,
    addLesson,
    updateLesson,
    deleteLesson
};
