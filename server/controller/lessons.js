// controller/lessons.js
const db = require("../database/index");

const getAllLessons = async (req, res) => {
    try {
        const lessons = await db.Lessons.findAll({
            where: { language: req.params.language },  // Use language from params
            order: [['level', 'ASC']],  // Order by level
        });

        res.send(lessons);
    } catch (error) {
        console.error("Error fetching lessons:", error);
        res.status(500).send("Failed to fetch lessons");
    }
};

const getLessonsByLevel = async (req, res) => {
    try {
      const { levelId } = req.params;  // Get levelId from the URL params
      const lessons = await db.Lessons.findAll({
        where: { level: levelId },  // Filter lessons by level
        order: [['id', 'ASC']],     // Order lessons by ID or any other field you prefer
      });
  
      res.send(lessons);
    } catch (error) {
      console.error("Error fetching lessons by level:", error);
      res.status(500).send("Failed to fetch lessons by level");
    }
  };
module.exports = { getAllLessons ,getLessonsByLevel};
