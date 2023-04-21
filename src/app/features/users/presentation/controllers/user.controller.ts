import { Request, Response } from 'express';

export class UserController {
    createUser(req: Request, res: Response) {
        console.log(req.body);
        const { name, email, profile } = req.body;

        

        return res.status(200).json('ok');
    }
}
