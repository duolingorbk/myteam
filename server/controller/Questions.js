const db = require("../database/index");

const getQuestionsByLessonId = async (req, res) => {
    try {
        const questions = await db.Questions.findAll({
            where: { lessonId: req.params.lessonId },
            include: [{ model: db.Answers }] 
        });
        res.send(questions);
    } catch (error) {
        console.error("Error fetching questions:", error);
        res.status(500).send(error);
    }
};


module.exports = {
    getAllQuestions , getQuestionsByLessonId 
};

