const db = require("../database/index");

const getAllAnswers = async (req, res) => {
    try {
        const answers = await db.Answers.findAll({ where: { questionId: req.params.questionId } });
        res.send(answers);
    } catch (error) {
        console.error("Error fetching answers:", error);
        res.status(500).send(error);
    }
};

module.exports = { getAllAnswers };
