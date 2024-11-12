
module.exports =  (sequelize , DataTypes)  => {
const Questions = sequelize.define('Questions', {

    content: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}  , { timestamps: false })
return Questions
}

