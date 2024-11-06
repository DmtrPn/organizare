import { Migration } from '@mikro-orm/migrations';

export class Migration20241105165616 extends Migration {
    override async up(): Promise<void> {
        this.addSql(
            `create table "example" ("example_id" varchar(255) not null, constraint "example_pkey" primary key ("example_id"));`,
        );

        this.addSql(
            `create table "notification" ("notification_id" uuid not null, "chat_id" varchar(255) not null, "entity_id" uuid not null, "entity_type" varchar(255) not null, "message" text not null, "status" varchar(255) not null, "execute_at" timestamptz not null, constraint "notification_pkey" primary key ("notification_id"));`,
        );

        this.addSql(
            `create table "organization" ("organization_id" uuid not null, "name" varchar(255) not null, constraint "organization_pkey" primary key ("organization_id"));`,
        );

        this.addSql(
            `create table "reminder" ("reminder_id" uuid not null, "chat_id" varchar(255) not null, "title" text not null, "description" text not null, "date" timestamptz not null, "created_at" timestamptz not null, constraint "reminder_pkey" primary key ("reminder_id"));`,
        );

        this.addSql(
            `create table "users" ("user_id" uuid not null, "chat_id" varchar(255) not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, constraint "users_pkey" primary key ("user_id"));`,
        );

        this.addSql(
            `create table "organization_users" ("organization_model_organization_id" uuid not null, "user_model_user_id" uuid not null, constraint "organization_users_pkey" primary key ("organization_model_organization_id", "user_model_user_id"));`,
        );

        this.addSql(
            `alter table "organization_users" add constraint "organization_users_organization_model_organization_id_foreign" foreign key ("organization_model_organization_id") references "organization" ("organization_id") on update cascade on delete cascade;`,
        );
        this.addSql(
            `alter table "organization_users" add constraint "organization_users_user_model_user_id_foreign" foreign key ("user_model_user_id") references "users" ("user_id") on update cascade on delete cascade;`,
        );
    }
}
