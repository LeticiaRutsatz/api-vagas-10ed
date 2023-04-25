import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterTableUserAddColumnCompany1682383401053 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'users',
            new TableColumn({ name: 'company', type: 'varchar', length: '70', isNullable: true }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'company');
    }
}
