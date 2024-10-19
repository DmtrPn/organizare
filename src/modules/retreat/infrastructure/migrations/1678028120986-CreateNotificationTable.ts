import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateNotificationTable1678028120986 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE notification (
                notification_id UUID PRIMARY KEY,
                retreat_id UUID NOT NULL REFERENCES retreat(retreat_id),
                chat_id INT NOT NULL REFERENCES users(chat_id),
                message TEXT NOT NULL,
                status TEXT NOT NULL,
                execute_at TIMESTAMPTZ NOT NULL
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE notification;
        `);
    }
}
