import { Request, Response, response } from "express";

export class UserController{
    createUser(req: Request, res: Response){
        return res.status(200).json('ok')
    }

}