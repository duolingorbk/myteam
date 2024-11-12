module.exports =  (sequelize , DataTypes)  => {
const User = sequelize.define('Users', {

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },


    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },


    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    progress: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    type: {
        type: DataTypes.ENUM('user', 'admin'),
        allowNull: true,
        defaultValue: 'user',

    },
} , { timestamps: false })
return User
}

