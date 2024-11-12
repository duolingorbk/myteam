
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
  progress: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }

} , { timestamps: false })
return Lessons
}
