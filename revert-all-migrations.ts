import { appDataSource } from './src/app/shared/infra/db/data-source';

(async () => {
    await appDataSource.initialize();
    await appDataSource.dropDatabase();
})();
