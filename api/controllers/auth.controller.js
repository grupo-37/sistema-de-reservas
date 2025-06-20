import Host from '../models/Host.js';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

export const registerHost = async (req,res)=> {
    try {        
        const { password, ...rest} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10)

        const userExist = await User.findOne({email: rest.email});

        if( userExist) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const host = await Host.create({
            ...rest,
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
        } else {
            res.status(400).json({ message: 'Invalid host data' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error: Error creating host' });
        console.error('Error creating host:', error);
    }
}
