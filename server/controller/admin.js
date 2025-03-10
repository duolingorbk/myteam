
const db = require("../database/index");

const createLesson = async (req, res) => {
  try {
    const { title, language, progress = 0, questions } = req.body;

    if (!Array.isArray(questions)) {
      return res.status(400).json({ message: "'questions' must be an array." });
    }

    const lesson = await db.Lessons.create({ title, language, progress });

    for (const question of questions) {
      const createdQuestion = await db.Questions.create({
        content: question.content,
        LessonId: lesson.id,
      });

      for (const answer of question.answers) {
        const status = answer.status === 1 ? 1 : 0;
        console.log(status);
        

        await db.Answers.create({
          content: answer.content,
          status : status,
          QuestionId: createdQuestion.id,
        });
      }
    }

    return res.status(201).json({ message: "Lesson created successfully", lesson });
  } catch (error) {
    console.error("Error creating lesson:", error);
    return res.status(500).json({ message: "Error creating lesson", error: error.message });
  }
};

module.exports = createLesson;
