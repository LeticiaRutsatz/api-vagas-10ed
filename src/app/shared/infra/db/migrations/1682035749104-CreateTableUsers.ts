import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableUsers1682035749104 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '50',
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        length: '50',
                    },
                    {
                        name: 'profile',
                        type: 'varchar',
                        length: '15',
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                        length: '100',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp'
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp'
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users', true, true, true);
    }
}
