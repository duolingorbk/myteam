const db = require("../database/index");

const getLessons = async (req, res) => {
  try {
    const lesson = await db.Lessons.findAll();
    console.log(lesson);

    res.send(lesson);
  } catch (error) {
    res.send(error);
  }
};



const getAllLessons = async (req, res) => {
  try {
      const lessons = await db.Lessons.findAll({
          where: { language: req.query.language } 
      });
      res.send(lessons);
  } catch (error) {
      console.error("Error fetching lessons:", error);
      res.status(500).send(error);
  }
}

module.exports = {
  getAllLessons,getLessons
};
