

module.exports =  (sequelize , DataTypes)  => {
  const  Answers = sequelize.define('Answers', {
    content: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    status: {
        type: DataTypes.TINYINT ,
        allowNull: true,
    }


} , { timestamps: false }) //for the time columns that sequelize generate AUTO


return Answers
}

