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

module.exports = { getAllLessons };
