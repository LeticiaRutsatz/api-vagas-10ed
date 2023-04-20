import { NextFunction, Request, Response } from "express";
import { z, ZodError } from "zod";
import { Profile } from "../../../../shared/domain/enums";


export const createUserValidator = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  
  const scheme = z.object({
    name: z.string(),
    email: z.string().email(),
    profile: z.nativeEnum(Profile)
  })

  try {

    const data = scheme.parse(req.body)
    req.body = data
    return next()

  } catch (error: any) {
    
    if (error instanceof ZodError) {
      return res.status(400).json(
        {
          error: error.issues.map((issue) => ({
            campo: issue.path[0],
            mensagem: issue.message,
            codigo: issue.code,
          }))
        }
      );
    }
    throw error;
  }
}
