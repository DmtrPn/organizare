import { Migration } from '@mikro-orm/migrations';

export class Migration20241027173947CreateNotificationTable extends Migration {
    override async up(): Promise<void> {
        this.addSql(`
        CREATE TABLE notification (
                notification_id UUID PRIMARY KEY,
                entity_id UUID NOT NULL,
                entity_type TEXT NOT NULL,
                chat_id TEXT NOT NULL REFERENCES users(chat_id)  ON DELETE CASCADE,
                message TEXT NOT NULL,
                status TEXT NOT NULL,
                execute_at TIMESTAMPTZ NOT NULL
            );
`);
    }

    override async down(): Promise<void> {
        this.addSql(`DROP TABLE notification;`);
    }
}
