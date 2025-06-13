import Host from '../models/Host';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import { validationResult, check } from 'express-validator';

export const createHost = async (req,res)=> {
    check('email', 'Email is required').isEmail();
    check('password', 'Password is required').notEmpty();
    check('password')
        .isLength({min: 8}).withMessage('Password must be at least 8 characters long')
        .matches(/\d/).withMessage('Password must contain at least one number')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
        .matches(/[@$!%*?&]/).withMessage('Password must contain at least one special character');

    //Validaciones requeridas para password: 
    // - Debe tener al menos 8 caracteres
    // - Debe contener al menos un número
    // - Debe contener al menos una letra mayúscula
    // - Debe contener al menos una letra minúscula
    // - Debe contener al menos un carácter especial (@, $, !, %, *, ?, &)

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { password, birthday, phone, address, rfc, ...rest} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10)

        const userExist = await User.findOne({email: rest.email});

        if( userExist) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const host = await Host.create({
            ...rest,
            birthday,
            phone,
            address,
            rfc,
            password: hashedPassword,
            role: 'Host'
        });

        if(host){
            res.status(201).json({
                _id: host._id,
                firstName: host.firstName,
                lastName: host.lastName,
                email: host.email,
                birthday: host.birthday,
                phone: host.phone,
                address: host.address,
                rfc: host.rfc,
                role: host.role,
            });
        }
    } catch (error) {
        console.error(`Error creating host: ${error.message}`);
        res.status(500).json({ message: 'Server Error: Error creating host' });
    }
}
