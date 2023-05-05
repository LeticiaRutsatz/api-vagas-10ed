import { NextFunction, Request, Response } from 'express';
import { z, ZodError } from 'zod';
import { badRequest } from '../../../../shared/presentation/http-helper';
import { Profile } from '../../../../shared/domain/enums';
import { unauthorized } from '../../../../shared/presentation/http-helper';

export const applyJobValidator = (req: Request, res: Response, next: NextFunction) => {
    if (req.user.profile !== Profile.CANDIDATE) {
        return unauthorized(res, { success: false, error: 'Need to be a candidate.' });
    }

    return next();
};
