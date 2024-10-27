import { Migration } from '@mikro-orm/migrations';

export class Migration20241020161403CreateUserTable extends Migration {
    public async up(): Promise<void> {
        await this.addSql(`
            CREATE TABLE users (
                user_id UUID PRIMARY KEY,
                chat_id TEXT NOT NULL UNIQUE,
                first_name TEXT NOT NULL,
                last_name TEXT NOT NULL
            );
        `);
    }

    public override async down(): Promise<void> {
        await this.addSql(`
            DROP TABLE users;
        `);
    }
}
