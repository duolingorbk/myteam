const db = require("../database/index");

const getAllQuestions = async (req, res) => {
    try {
        const questions = await db.Questions.findAll();  // fetch all questions
        console.log(questions);  // log the fetched data

        res.send(questions);  // send the data in response
    } catch (error) {
        console.error("Error fetching questions:", error);  // log any errors
        res.status(500).send(error);  // send a 500 error if something goes wrong
    }
};

module.exports = {
    getAllQuestions
};
