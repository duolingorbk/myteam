const db = require("../database/index");

const getAllAnswers = async (req, res) => {
    try {
        const answers = await db.Answers.findAll();  // Fetch all answers
        console.log(answers);  // Log the results

        res.send(answers);  // Send the results as a response
    } catch (error) {
        console.error("Error fetching answers:", error);  // Log any errors
        res.status(500).send(error);  // Send a 500 error if something goes wrong
    }
}

const getAnswersByQuestion = async (req, res) => {
    try {
      const questionId = req.params.questionId;
      const answers = await db.Answers.findAll({
        where: { question_id: questionId }
      });
  
      res.send(answers);
    } catch (error) {
      console.error("Error fetching answers:", error);
      res.status(500).send(error);
    }
  }

module.exports = {
    getAllAnswers , getAnswersByQuestion
};
