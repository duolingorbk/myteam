const mysql = require("mysql2");
const con = require("./index");

module.exports = {
    // Get all questions
    getAllQuestions: (callback) => {
        con.query("SELECT * FROM questions", (err, result) => {
            callback(err, result);
        });
    },
    
    // Get a single question by its ID
    getOneQuestion: (questionId, callback) => {
        con.query("SELECT * FROM questions WHERE idquestions = ?", questionId, (err, result) => {
            callback(err, result);
        });
    },

    // Add a new question
    addQuestion: (values, callback) => {
        con.query("INSERT INTO questions SET ?", values, (err, result) => {
            callback(err, result);
        });
    },

    // Update a question by its ID
    updateQuestion: (questionId, values, callback) => {
        con.query("UPDATE questions SET ? WHERE idquestions = ?", [values, questionId], (err, result) => {
            callback(err, result);
        });
    },

    // Delete a question by its ID
    deleteQuestion: (questionId, callback) => {
        con.query("DELETE FROM questions WHERE idquestions = ?", questionId, (err, result) => {
            callback(err, result);
        });
    }
};
