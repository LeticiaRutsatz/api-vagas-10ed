import express, { Express } from 'express';

export default (app: Express) => {
    app.get('/', (req, res) => res.status(200).json('API is runnig...'));
};
