import dotevn from 'dotenv';
dotevn.config();

export const keyToken = process.env.KEY_TOKEN || 'defaultSecretKey';

