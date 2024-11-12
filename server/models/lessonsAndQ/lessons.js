const mysql = require("mysql2");
const con = require("./index");

module.exports = {
    // Get all lessons
    getAllLessons: (callback) => {
        con.query("SELECT * FROM lessons", (err, result) => {
            callback(err, result);
        });
    },
    
    // Get a single lesson by its ID
    getOneLesson: (lessonId, callback) => {
        con.query("SELECT * FROM lessons WHERE idlessons = ?", lessonId, (err, result) => {
            callback(err, result);
        });
    },

    // Add a new lesson
    addLesson: (values, callback) => {
        con.query("INSERT INTO lessons SET ?", values, (err, result) => {
            callback(err, result);
        });
    },

    // Update a lesson by its ID
    updateLesson: (lessonId, values, callback) => {
        con.query("UPDATE lessons SET ? WHERE idlessons = ?", [values, lessonId], (err, result) => {
            callback(err, result);
        });
    },

    // Delete a lesson by its ID
    deleteLesson: (lessonId, callback) => {
        con.query("DELETE FROM lessons WHERE idlessons = ?", lessonId, (err, result) => {
            callback(err, result);
        });
    }
};