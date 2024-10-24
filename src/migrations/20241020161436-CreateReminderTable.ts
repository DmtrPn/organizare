import { Migration } from '@mikro-orm/migrations';

export class Migration20241020161436CreateReminderTable extends Migration {
    public async up(): Promise<void> {
        await this.addSql(`
            CREATE TABLE reminder (
                reminder_id UUID PRIMARY KEY,
                title TEXT NOT NULL,
                description TEXT,
                chat_id INT NOT NULL REFERENCES users(chat_id) ON DELETE CASCADE,
                date TIMESTAMPTZ NOT NULL,
                created_at TIMESTAMPTZ NOT NULL
            );
        `);
    }

    public override async down(): Promise<void> {
        await this.addSql(`
            DROP TABLE reminder;
        `);
    }
}
