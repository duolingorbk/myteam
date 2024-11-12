const db = require("../database/index")



const getAlllessons = async (req , res) => {
try {
const lesson = await db.Lessons.findAll()
console.log();

res.send(lesson)
}
catch(error) {
res.send(error)
}


}


module.exports = {getAlllessons}