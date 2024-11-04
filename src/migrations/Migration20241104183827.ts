import { Migration } from '@mikro-orm/migrations';

export class Migration20241104183827 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "example" ("example_id" varchar(255) not null, constraint "example_pkey" primary key ("example_id"));`);

    this.addSql(`create table "notification" ("notification_id" uuid not null, "chat_id" varchar(255) not null, "entity_id" uuid not null, "entity_type" varchar(255) not null, "message" text not null, "status" varchar(255) not null, "execute_at" timestamptz not null, constraint "notification_pkey" primary key ("notification_id"));`);

    this.addSql(`create table "organization" ("organization_id" uuid not null, "name" varchar(255) not null, constraint "organization_pkey" primary key ("organization_id"));`);

    this.addSql(`create table "organization_user_model" ("user_id" uuid not null, "chat_id" varchar(255) not null, constraint "organization_user_model_pkey" primary key ("user_id"));`);

    this.addSql(`create table "organization_organization_user_model" ("organization_model_organization_id" uuid not null, "organization_user_model_user_id" uuid not null, constraint "organization_organization_user_model_pkey" primary key ("organization_model_organization_id", "organization_user_model_user_id"));`);

    this.addSql(`create table "reminder" ("reminder_id" uuid not null, "chat_id" varchar(255) not null, "title" text not null, "description" text not null, "date" timestamptz not null, "created_at" timestamptz not null, constraint "reminder_pkey" primary key ("reminder_id"));`);

    this.addSql(`create table "users" ("user_id" uuid not null, "chat_id" varchar(255) not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, constraint "users_pkey" primary key ("user_id"));`);

    this.addSql(`alter table "organization_organization_user_model" add constraint "organization_organization_user_model_organizatio_3eca2_foreign" foreign key ("organization_model_organization_id") references "organization" ("organization_id") on update cascade on delete cascade;`);
    this.addSql(`alter table "organization_organization_user_model" add constraint "organization_organization_user_model_organizatio_5b811_foreign" foreign key ("organization_user_model_user_id") references "organization_user_model" ("user_id") on update cascade on delete cascade;`);
  }

}
