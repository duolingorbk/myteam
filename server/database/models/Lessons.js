
module.exports =  (sequelize , DataTypes)  => {
const Lessons = sequelize.define('Lessons', {
    title: {
        type: DataTypes.STRING,
        allowNull: true,
    },
 language: {
        type: DataTypes.ENUM('english', 'french'),
        allowNull: false,
    },
    level: {
        type: DataTypes.ENUM('easy', 'medium', 'hard'),
        allowNull: false,
    },
  progress: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    }

} , { timestamps: false })
return Lessons
}
