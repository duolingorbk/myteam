const db = require("../database/index");

const getAllAnswers = async (req, res) => {
    try {
        const answers = await db.Answers.findAll({ where: { lessonId: req.params.questionId } });
        res.send(answers);
    } catch (error) {
        console.error("Error fetching answers:", error);
        res.status(500).send(error);
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
