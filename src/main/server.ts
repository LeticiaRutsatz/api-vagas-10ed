import app from './config/app';
import 'dotenv/config';
import 'reflect-metadata';
import { appDataSource } from '../app/shared/infra/db/data-source';

const port = process.env.PORT || 8080;

appDataSource.initialize().then(() => {
    app.listen(port, () => console.log('Server is running onPort ' + port));
});
