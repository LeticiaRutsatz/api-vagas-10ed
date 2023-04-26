import jwt from 'jsonwebtoken';
import 'dotenv/config';

interface Token {
    sign(data: any): string;
    verify(token: string): string | jwt.JwtPayload;
}

const jwtKey = process.env.JWT_KEY as string;

export class JwtToken implements Token {
    sign(data: any): string {
        return jwt.sign(data, jwtKey, { expiresIn: '1h' });
    }

    verify(token: string): string | jwt.JwtPayload {
        return jwt.verify(token, jwtKey, { maxAge: '1h' });
    }
}
