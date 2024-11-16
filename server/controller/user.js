const db = require("../database/index");
const bcrypt = require('bcryptjs'); //to hash the pasword
const jwt = require('jsonwebtoken');//to generate the token
const dotenv = require('dotenv').config
JWT_SECRET='ascefbth,plnihcdxuwy'



const validateStrongPassword = (password) => {
    const minLength = 8;
    const passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

    const errors = [];

    if (password.length < minLength) {
        errors.push(`Password must be at least ${minLength} characters long`);//this is shown when the password length is below 8 
    }

    if (!passwordCheck.test(password)) {//if the entered password does not include any of the above password check,this error will appear
        errors.push("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character");
    }

    return {
        isValid: errors.length === 0,//this is a returned oject that shows if the password is valid the errors array will have 0 length
        errors: errors//this is an array that includes all of the above errors if any of them is not included in the password 
    };
};
const signup = async (req, res) => {
    try {
        const {
            email,
            password,
            name
        } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        //to hash the password, 10 rounds of salting for better security 
        //(the salt is a random string added to the password (the "salt")before hashing it)

        console.log(req.body);

        if (!email || !password || !name) {//to check if any of the fields is left empty
            return res.status(400).send('Missing required fields');
        }

        const passwordValidation = validateStrongPassword(password);
        if (!passwordValidation.isValid) {
            return res.status(400).json({
                message: 'Password is too weak',
                errors: passwordValidation.errors
            });
        }



        const getuser = await db.User.findOne({//to check if we already have the user in the database with the same email address
            where: {
                email: email
            }
        });

        if (getuser) {//if the user already exists an error message is dispayed showing that the user already exists
            return res.status(400).send("User already exists");
        } else {
            const user = await db.User.create({//if we do not already have the user, a new user will be created using the sme deails but the password wil be hashed
                email: email,
                password: hashedPassword,
                name: name
            });

            console.log('User created:', user);
            res.send(user);//to display The created user and his details
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};


const findAllUsers = async (req, res) => {
    try {
        const users = await db.User.findAll();
        res.send(users);
    } catch (error) {
        res.send(error);
    }
}


const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await db.User.destroy({
            where: { id: id }
        });

        res.send("Deleted");
    } catch (error) {
        res.send(error);
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { email, password, name } = req.body;

        const user = await db.User.update(
            { email, password, name },
            { where: { id } }
        );

        res.send(user);
    } catch (error) {
        res.send(error);
    }
}


const login = async (req, res) => {
    try {
        const {
            email,
            password,
        } = req.body;

        const user = await db.User.findOne({ where: { email } });//this is to find the user in the database with the email address the user used to login 

        if (!user) {//if the email address is not in our database, an error message will be shown indicaing that we do not have this user
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);//this to compare if the given password is the same as the hashed one in our database

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });//if the password is not the same, it displays an error 
        }

        const token = jwt.sign(//json web token to give a token to the user once they are logged in 
            { id: user.id, name: user.name, email: user.email },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            message: 'Login successful',
            user: {//the token will include all these 
                id: user.id,
                name: user.name,
                image: user.image,
                email: user.email,
                type: user.type
            },
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

module.exports = { signup, login , findAllUsers , deleteUser , updateUser };
