import { NextFunction, Request, Response } from 'express';
import { z, ZodError } from 'zod';
import { Profile } from '../../../../shared/domain/enums';
import { badRequest } from '../../../../shared/presentation/http-helper';

function defineUserSchema(profile: Profile) {
    const baseScheme = z.object({
        name: z.string().min(2),
        email: z.string().email(),
        profile: z.nativeEnum(Profile),
    });

    if (profile === Profile.RECRUITER) {
        return baseScheme.extend({
            company: z.string().nonempty(),
        });
    }

    return baseScheme;
}

export const createUserValidator = (req: Request, res: Response, next: NextFunction) => {
    let body = req.body;

    if (typeof body.profile === 'string') {
        body.profile = (body.profile as string).toUpperCase();
    }

    if (body.profile === Profile.CANDIDATE) {
        return badRequest(res, { success: false, error: 'This profile cannot be created.' });
    }

    const scheme = defineUserSchema(body.profile);

    try {
        const data = scheme.parse(body);
        Object.assign(
            req.body,
            data,
            data.profile === Profile.ADMIN ? { company: undefined } : undefined,
        );
        return next();
    } catch (error: any) {
        if (error instanceof ZodError) {
            return badRequest(res, {
                success: false,
                error: error.issues.map((issue) => ({
                    campo: issue.path[0],
                    mensagem: issue.message,
                    codigo: issue.code,
                })),
            });
        }
        throw error;
    }
};
