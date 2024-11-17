const db = require("../database/index");

const getAllAnswers = async (req, res) => {
    try {
        const answers = await db.Answers.findAll({ where: { QuestionId: req.params.QuestionId } });
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




module.exports = { getAllAnswers };
