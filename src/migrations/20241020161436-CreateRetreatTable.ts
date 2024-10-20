import { Migration } from '@mikro-orm/migrations';

export class Migration20241020161436CreateRetreatTable extends Migration {
    public async up(): Promise<void> {
        await this.addSql(`
            CREATE TABLE retreat (
                retreat_id UUID PRIMARY KEY,
                chat_id INT NOT NULL REFERENCES users(chat_id),
                start_date TIMESTAMPTZ NOT NULL
            );
        `);
    }

    public override async down(): Promise<void> {
        await this.addSql(`
            DROP TABLE retreat;
        `);
    }
}
