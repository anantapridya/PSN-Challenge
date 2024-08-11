import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const SECRET_KEY = "ayambakarenak";
const USERS = [
    { username: "ananta", password: "PSN_CHALLENGE" },
    { username: "psn", password: "psn1234" },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { username, password } = req.body;

        const user = USERS.find(u => u.username === username && u.password === password);

        if (user) {
            const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
            res.status(200).json({ token });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}