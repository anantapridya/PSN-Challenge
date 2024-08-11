import jwt from 'jsonwebtoken';

const SECRET_KEY = 'ayambakarenak'; // Sama dengan kunci rahasia di API route

export const authenticateToken = (token: string | undefined) => {
    if (!token) return null;
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        return null;
    }
};