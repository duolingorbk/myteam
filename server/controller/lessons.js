const db = require("../database/index");


const getAllLessons = async (req, res) => {
    try {

        const lessons = await db.Lessons.findAll({
            where: { language: req.query.language }  // Filter by language
        });
        res.send(lessons);
    } catch (error) {
        console.error("Error fetching lessons:", error);
        res.status(500).send(error);
    }
};

module.exports = { getAllLessons };

      

