const mysql = require("mysql2");
const con = require("./index");

module.exports = {
    // Get all answers
    getAllAnswers: (callback) => {
        con.query("SELECT * FROM answers", (err, result) => {
            callback(err, result);
        });
    },
    
    // Get a single answer by its ID
    getOneAnswer: (answerId, callback) => {
        con.query("SELECT * FROM answers WHERE idanswers = ?", answerId, (err, result) => {
            callback(err, result);
        });
    },

    // Add a new answer
    addAnswer: (values, callback) => {
        con.query("INSERT INTO answers SET ?", values, (err, result) => {
            callback(err, result);
        });
    },

    // Update an answer by its ID
    updateAnswer: (answerId, values, callback) => {
        con.query("UPDATE answers SET ? WHERE idanswers = ?", [values, answerId], (err, result) => {
            callback(err, result);
        });
    },

    // Delete an answer by its ID
    deleteAnswer: (answerId, callback) => {
        con.query("DELETE FROM answers WHERE idanswers = ?", answerId, (err, result) => {
            callback(err, result);
        });
    }
};
