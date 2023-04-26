import jwt from 'jsonwebtoken';
import { jwtConfig } from '../../../config/jwt.config';

interface Token {
    sign(data: any): string;
    verify(token: string): string | jwt.JwtPayload;
}

export class JwtToken implements Token {
    sign(data: any): string {
        return jwt.sign(data, jwtConfig.key, { expiresIn: jwtConfig.expireIn });
    }

    verify(token: string): string | jwt.JwtPayload {
        return jwt.verify(token, jwtConfig.key, { maxAge: jwtConfig.maxAge });
    }
}
