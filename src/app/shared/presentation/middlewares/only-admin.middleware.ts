import { NextFunction, Request, Response } from 'express';
import { unauthorized } from '../http-helper';
import { Profile } from '../../domain/enums';

export const onlyAdmin = (req: Request, res: Response, next: NextFunction) => {
    const profile = req.user.profile;

    if (profile != Profile.ADMIN) {
        return unauthorized(res, { success: false, error: 'User not allowed' });
    }

    return next();
};
