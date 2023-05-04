import { NextFunction, Request, Response } from "express";
import { z, ZodError } from 'zod';
import { badRequest } from "../../../../shared/presentation/http-helper";

export const createJobValidator = (req: Request, res: Response, next: NextFunction) => {
  let body = req.body;

  const scheme = z.object({
    description: z.string().min(2),
    limitDate: z.preprocess((arg)=> new Date(arg as any), z.date().min(new Date)),
    maxCandidates: z.number().int().min(1).optional(),
  });


  try {
    const data = scheme.parse(body);
    Object.assign(
      req.body,
      data
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
}