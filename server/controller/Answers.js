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
        where: { QuestionId: questionId }
      });
  
      res.send(answers);
    } catch (error) {
      console.error("Error fetching answers:", error);
      res.status(500).send(error);
    }
  }

  const deleteAnswer = async (req, res) => {
    try {
      const { id } = req.params;
      await db.Answers.destroy({
        where: { id: id }
      });
      res.send("Answer Deleted");
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  

module.exports = {
    getAllAnswers , getAnswersByQuestion , deleteAnswer
};
