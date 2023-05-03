import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateTableJobs1683076125294 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'jobs',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                    },
                    {
                        name: 'id_recruiter',
                        type: 'uuid',
                    },
                    {
                        name: 'description',
                        type: 'text',
                    },
                    {
                        name: 'company_name',
                        type: 'varchar',
                    },
                    {
                        name: 'is_open',
                        type: 'boolean',
                    },
                    {
                        name: 'limit_date',
                        type: 'timestamp',
                    },
                    {
                        name: 'max_candidate',
                        type: 'integer',
                        isNullable: true,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                    },
                ],
                foreignKeys: [
                    new TableForeignKey({
                        columnNames: ['id_recruiter'],
                        referencedColumnNames : ['id'],
                        referencedTableName: 'users',
                        name: 'fk_jobs_recruiter'
                    }),
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('jobs', true, true, true)
    }

}
