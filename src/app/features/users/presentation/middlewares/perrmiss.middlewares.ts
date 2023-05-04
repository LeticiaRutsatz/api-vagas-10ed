import { NextFunction, Request, Response } from "express";
import { Profile } from "../../../../shared/domain/enums";
import { unauthorized } from "../../../../shared/presentation/http-helper";

export const permission = (req: Request, res: Response, next: NextFunction) => {
    const profile =  req.user.profile

    if(profile === Profile.CANDIDATE){
        return unauthorized(res, { success: false, error: 'User not allowed' });
    }

    return next()
}