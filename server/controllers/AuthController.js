import User from '../models/User.js';
import Role from '../models/Role.js';
import Validator  from 'express-validator';
import bcrypt from 'bcryptjs';
import generateAccessToken from '../helpers/generateAccessToken.js';
const { validationResult } = Validator;

class AuthController {
    async registration(req, res){ // из reqiuest достаем информацию, которую отправил пользователь, а в responce возвращяем какую-либо информацию
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()){
                return res.status(400).json({message:'Registration error', errors});
            }
            const { username, password, role } = req.body;
            const candidat = await User.findOne({username});

            if (candidat) {
                return res.status(400).json({message: 'A user with the same name already exists'});
            }

            const hashPassword = bcrypt.hashSync(password, 5);
            const userRole = await Role.findOne({value: role}); 
            const user = new User({username, password: hashPassword, role: userRole.value});
            user.save();

            return res.json({message: 'User successfully registered'})
        } catch (error) {
            console.log(error);
            res.status(400).json({message: 'Registration error'});
        }
    }

    async login(req, res){
        try {
            const { username, password } = req.body;
            const user = await User.findOne({username});
            if (!user) {
                return res.status(400).json({message: `User named ${username} not found`})
            }

            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({message: `Invalid password, please try again!`});
            }

            const token = generateAccessToken(user._id, user.role);

            return res.json({ token, username, role: user.role });
        } catch (error) {
            console.log(error);
            res.status(400).json({message: 'Login error'});
        }
    }

    async getUsers(req, res){
        try {
            const users = await User.find();
            return res.json({users});
        } catch (error) {
            console.log(error);
            res.status(400).json({message: 'Get error'});
        }
    }
}

export default new AuthController();