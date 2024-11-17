// controller/lessons.js
const db = require("../database/index");

// Get all lessons by language
const getAllLessons = async (req, res) => {
    try {
        const { language } = req.params;  // Use language from params
        const lessons = await db.Lessons.findAll({
            where: { language },  // Filter lessons by language
           
        });

        res.send(lessons);  // Send the fetched lessons
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
