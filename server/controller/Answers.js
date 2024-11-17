const db = require("../database/index");

const getAllAnswers = async (req, res) => {
    try {
        const answers = await db.Answers.findAll({ where: { questionId: req.params.questionId } });
        res.send(answers);
    } catch (error) {
        console.error("Error fetching answers:", error);
        res.status(500).send(error);
    }
}


const getAnswers = async (req, res) => {
  try {
      const answers = await db.Answers.findAll();  // fetch all questions
  // log the fetched data

      res.send(answers);  // send the data in response
  } catch (error) {
      console.error("Error fetching questions:", error);  // log any errors
      res.status(500).send(error);  // send a 500 error if something goes wrong
  }
};


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

  const updateAnswer = async (req, res) => {
    try {
        const { content, status } = req.body;
        const { id } = req.params; 

        const updatedAnswer = await db.Answers.update(
            { content, status },
            { where: { id } }
        );

        res.send(updatedAnswer);
    } catch (error) {
        res.send(error);
    }
}
  

module.exports = {
    getAllAnswers , getAnswersByQuestion , deleteAnswer , updateAnswer , getAnswers
};
