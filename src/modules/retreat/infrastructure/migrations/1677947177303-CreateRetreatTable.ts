import { Migration } from '@mikro-orm/migrations';

export class CreateRetreatTable1677947177303 extends Migration {
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
