// controller/lessons.js
const db = require("../database/index");

const getAllLessons = async (req, res) => {
  try {
      const { language } = req.params;
      const lessons = await db.Lessons.findAll({
          where: { language },
      });
      res.send(lessons);
  } catch (error) {
      console.error("Error fetching lessons:", error);
      res.status(500).send("Failed to fetch lessons");
  }
};






// Get all lessons (useful for fetching without filters)
const getLessons = async (req, res) => {
    try {
        const lessons = await db.Lessons.findAll();
        console.log(lessons);

        res.send(lessons);
    } catch (error) {
        console.error("Error fetching lessons:", error);
        res.status(500).send("Failed to fetch lessons");
    }
};



module.exports = {

    getAllLessons,
    getLessons,
   
};
