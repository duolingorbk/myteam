
module.exports =  (sequelize , DataTypes)  => {
const Questions = sequelize.define('Questions', {

    content: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}  , { timestamps: false })  ///=> this tell sequelize to not cerate automatically   the to  keys the update and the create 
return Questions
}

