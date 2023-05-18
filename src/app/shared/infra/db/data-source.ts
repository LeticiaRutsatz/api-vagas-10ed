import { DataSource } from 'typeorm';
import entities from './entities';
import migrations from './migrations';

let _dataSource: DataSource;

console.log(process.env.NODE_ENV);

if (process.env?.NODE_ENV?.toLowerCase() == 'test') {
    _dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'postgres',
        logging: false,
        ssl: undefined,
        entities,
        migrations,
    });
} else {
    _dataSource = new DataSource({
        type: 'postgres',
        host: 'motty.db.elephantsql.com',
        port: 5432,
        username: 'pmfakupe',
        password: 'qBadWkd8sIiUB8C4ZFBnsvC-VzSDu70m',
        database: 'pmfakupe',
        logging: true,
        ssl: {
            rejectUnauthorized: false,
        },
        entities,
        migrations,
    });
}

export const appDataSource = _dataSource;
