import { Request, Response } from "express";

export class JobsController{
  async createJob(req: Request, res: Response){
    const { description, limitDate, maxCandidates } = req.body;

    return res.json(req.body);

  }
}