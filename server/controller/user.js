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

const login = async (req, res) => {
    try {
        const {
            email,
            password,
        } = req.body;

        // Changed User to db.User to match your database import
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
                email: user.email
            },
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};
const invalidatedTokens = new Set();

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        // Check if token is in invalidated list
        if (invalidatedTokens.has(token)) {
            return res.status(401).json({ message: 'Token is no longer valid' });
        }

        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();

    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

const logout = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        // Add the token to the invalidated tokens list
        invalidatedTokens.add(token);

        // Send only one response
        return res.status(200).json({
            message: 'Logout successful'
        });

    } catch (error) {
        // Send only one error response
        return res.status(500).json({
            message: 'Error during logout',
            error: error.message
        });
    }
};

// Fixed the exports syntax
module.exports = { signup, login ,verifyToken, logout};