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


const getQuestionsByLessonId = async (req, res) => {
    try {
      const lessonId = req.params.lessonId;
      const questions = await db.Questions.findAll({
        where: {
          LessonId: lessonId 
        }
      });
      res.send(questions);
    } catch (error) {
      console.error("Error fetching questions:", error);
      res.status(500).send({ message: "Error fetching questions" });
    }
  };

  const getQuestionsAndAnswersByLessonId = async (req, res) => {
    try {
      const lessonId = req.params.lessonId;
      const questions = await db.Questions.findAll({
        where: { LessonId: lessonId },
        include: [{ model: db.Answers }] 
      });
      res.json(questions); 
    } catch (error) {
      console.error("Error fetching questions:", error);
      res.status(500).send({ message: "Error fetching questions" });
    }
  };

  const deleteQuestion = async (req, res) => {
    try {
      const { id } = req.params;
      await db.Questions.destroy({
        where: { id: id }
      });
      res.send("Question Deleted");
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

  const updateQuestion = async (req, res) => {
    try {
      const questionId = req.params.id;
      const { content } = req.body;
  
      await db.Questions.update(
        { content },
        { where: { id: questionId } }
      );
  
      res.send({ message: 'Question updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error updating question' });
    }
  };
  
  

module.exports = {
    getAllQuestions , getQuestionsByLessonId  , getQuestionsAndAnswersByLessonId , deleteQuestion , updateQuestion
};

