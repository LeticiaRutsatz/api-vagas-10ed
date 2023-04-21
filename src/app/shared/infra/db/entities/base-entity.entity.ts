import { randomUUID } from 'crypto';
import { PrimaryColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm';

export class BaseEntity {
    @PrimaryColumn()
    id!: string;

    @Column({ name: 'created_at' })
    createdAt!: Date;

    @Column({ name: 'updated_at' })
    updatedAt!: Date;

    @BeforeInsert()
    beforeSave() {
        this.id = randomUUID();
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    @BeforeUpdate()
    beforeUpdate() {
        this.updatedAt = new Date();
    }
}
