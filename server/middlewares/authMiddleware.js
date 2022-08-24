import jwt from 'jsonwebtoken';
import config from '../config.js';

const {secretKey} = config; 

function authMiddleware(req, res, next){
    if(req.method === "OPTIONS") {
        next();
    }
    try {
        const token = (req.headers.authorization || '').split(' ')[1];
        if (!token){
            return res.status(403).json({message: 'User not authorized'});
        }
        const decodedData = jwt.verify(token, secretKey);
        req.user = decodedData;
        next();
    } catch (error) {
        console.log(error);
        return res.status(403).json({message: 'User not authorized'});
    }
}

export default authMiddleware;