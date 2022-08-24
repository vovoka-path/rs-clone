import jwt from 'jsonwebtoken';
import config from '../config.js';

const {secretKey} = config; 

function roleMiddleware(userRole) {
    return function(req, res, next){
        if(req.method === "OPTIONS") {
            next();
        }
        try {
            const token = (req.headers.authorization || '').split(' ')[1];
            if (!token){
                return res.status(403).json({message: 'User not authorized'});
            }
            const { role } = jwt.verify(token, secretKey);

            let hasRole = false;
            if (userRole === role) {
                hasRole = true;
            }
            if(!hasRole) {
                return res.status(403).json({message: `You don't have access`});
            }
            next();
        } catch (error) {
            console.log(error);
            return res.status(403).json({message: 'User not authorized'});
        }
    }
}

export default roleMiddleware;