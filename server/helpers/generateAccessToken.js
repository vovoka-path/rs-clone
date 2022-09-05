import jwt from 'jsonwebtoken';
import config from '../config.js';

const {secretKey} = config; 

const generateAccessToken = (id, role) => {
    const payload = {
        id,
        role
    };

    return jwt.sign(payload, secretKey, {expiresIn: '24h'});
};

export default generateAccessToken;

