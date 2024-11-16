const { Sequelize  } = require('sequelize');


const sequelize = new Sequelize('speakeasy', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql' 
});

sequelize
 .authenticate()
 .then(() => {
  console.log("DATABASE CONNECTED");
 })
 .catch((err) => {
  console.log(err);
 });


const db ={}
db.sequelize = sequelize 
db.Sequelize = Sequelize
db.User = require("./models/User")(sequelize , Sequelize)
db.Answers = require("./models/Answers")(sequelize , Sequelize)
db.Lessons = require("./models/Lessons")(sequelize , Sequelize)
db.Questions = require("./models/Questions")(sequelize , Sequelize)



db.User.hasMany(db.Lessons)
db.Lessons.belongsTo(db.User)

db.Lessons.hasMany(db.Questions)
db.Questions.belongsTo(db.Lessons)

db.Questions.hasMany(db.Answers)
db.Answers.belongsTo(db.Questions)

//   sequelize.sync({alter : true}).then(() => {
//  console.log(' table created successfully!');
//  }).catch((error) => {
//   console.error('Unable to create table : ', error);
//  });


module.exports= db


