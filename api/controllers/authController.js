import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; 
import { keyToken } from '../config/constants.js';

const generateToken = (user) => {
    return jwt.sign({id}, keyToken, { expiresIn: '30d' });
};

export const authenticateUser = async (req, res) => {
    const {email, password} = req.body;
    const userId = await User.findOne({email})
    
    if (userId && (await bcrypt.compare(password, userId.password))) {
        res.json({
            _id: userId._id,
            name: userId.name,
            tokenAccess: generateToken(userId._id),
        });
        res.status(200).json({message:'Token', token: generateToken(userId._id)});
    } else {
        res.status(401).json({message: 'Credenciales inválidas'});
    }

}