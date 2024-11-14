const db = require("../database/index");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'ascefbth,plnihcdxuwy';

const signup = async (req, res) => {
    try {
        const {
            email,
            password,
            name
        } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        console.log(req.body);
        
        if (!email || !password || !name) {
            return res.status(400).send('Missing required fields');
        }

        const getuser = await db.User.findOne({
            where: {
                email: email
            }
        });

        if (getuser) {
            return res.status(400).send("User already exists");
        } else {
            const user = await db.User.create({
                email: email,
                password: hashedPassword,
                name: name
            });

            console.log('User created:', user);
            res.send(user);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

const checkEmail = async (req, res) => {
    try {
        const { email } = req.body;
        
        const user = await db.User.findOne({
            where: { email }
        });

        return res.json({
            exists: !!user
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}
const login = async (req, res) => {
    try {
        const {
            email,
            password,
        } = req.body;

        const user = await db.User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user.id, name: user.name, email: user.email },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            message: 'Login successful',
            user: {
                id: user.id,
                name: user.name,
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

module.exports = { signup, login ,checkEmail};