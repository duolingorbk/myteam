const db = require("../database/index");


const createLesson = async (req, res) => {
  try {

    const lessonData = {
      title: req.body.title,
      language: req.body.language,
      progress: req.body.progress || 0,
      questions: req.body.questions.map(question => ({
        content: question.content,
        answers: question.answers.map(answer => ({
          content: answer.content,
          status: answer.status
        }))
      }))
    };

    const lesson = await db.Lessons.create(lessonData, {
      include: [{
        model: db.Questions,
        include: [{
          model: db.Answers
        }]
      }]
    });

    return res.status(201).json({
      message: 'Lesson created successfully',
      lesson
    });

  } catch (error) {
    console.error('Error creating lesson:', error);
    return res.status(500).json({
      message: 'Error creating lesson',
      error: error.message
    });
  }}
module.exports=createLesson


