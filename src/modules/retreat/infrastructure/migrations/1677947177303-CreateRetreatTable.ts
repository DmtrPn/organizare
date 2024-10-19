import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRetreatTable1677947177303 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE retreat (
                retreat_id UUID PRIMARY KEY,
                chat_id INT NOT NULL REFERENCES users(chat_id),
                start_date TIMESTAMPTZ NOT NULL
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE retreat;
        `);
    }
}
