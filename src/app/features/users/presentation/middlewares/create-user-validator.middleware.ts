import { NextFunction, Request, Response } from 'express';
import { z, ZodError } from 'zod';
import { Profile } from '../../../../shared/domain/enums';

export const createUserValidator = (req: Request, res: Response, next: NextFunction) => {
    if (typeof req.body.profile === 'string') {
        req.body.profile = (req.body.profile as string).toUpperCase();
    }
    if (req.body.profile === 'RECRUITER' && !req.body.company) {
        return res.status(400).json({ error: 'Obrigatorio informar a Empresa'})
    }
    const scheme = z.object({
        name: z.string().min(2),
        email: z.string().email(),
        profile: z.nativeEnum(Profile),
    });

    try {
        const data = scheme.parse(req.body);
        Object.assign(req.body, data);
        return next();
    } catch (error: any) {
        if (error instanceof ZodError) {
            return res.status(400).json({
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
