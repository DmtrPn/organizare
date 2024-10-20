import { Migration } from '@mikro-orm/migrations';

export class Migration20241020161520CreateNotificationTable extends Migration {
    public async up(): Promise<void> {
        await this.addSql(`
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

    public override async down(): Promise<void> {
        await this.addSql(`
            DROP TABLE notification;
        `);
    }
}
