import type { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.sql(`
        CREATE TYPE user_role AS ENUM ('user', 'admin');

        ALTER TABLE users
        ADD COLUMN role user_role NOT NULL DEFAULT 'user';
    `);
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.sql(`
        ALTER TABLE users
        DROP COLUMN role;
        
        DROP TYPE user_role;
    `);
}
