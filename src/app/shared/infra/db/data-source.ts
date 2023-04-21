import { DataSource } from 'typeorm';

export const appDataSource = new DataSource({
    type: 'postgres',
    url: config.databaseUrl,
    logging: true,
    ssl: {
        rejectUnauthorized: false,
    },
    entities,
    migrations,
    synchronize: false,
});
