const db = require("../database/index");

const getAllQuestions = async (req, res) => {
    try {
        const questions = await db.Questions.findAll(); 
        console.log(questions); 
        res.send(questions);  
    } catch (error) {
        console.error("Error fetching questions:", error);  
        res.status(500).send(error);  
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

