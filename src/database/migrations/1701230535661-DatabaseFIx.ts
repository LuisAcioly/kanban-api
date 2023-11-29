import { MigrationInterface, QueryRunner } from "typeorm";

export class DatabaseFIx1701230535661 implements MigrationInterface {
    name = 'DatabaseFIx1701230535661'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "workspace" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_406f56fc2a42ad5f541973cdbee" UNIQUE ("name"), CONSTRAINT "PK_ca86b6f9b3be5fe26d307d09b49" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "board" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "workspaceId" integer NOT NULL, CONSTRAINT "UQ_6b0abd12e5dbe0e49bf4f9d79e9" UNIQUE ("name"), CONSTRAINT "PK_865a0f2e22c140d261b1df80eb1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "workspace_users_users" ("workspaceId" integer NOT NULL, "usersId" integer NOT NULL, CONSTRAINT "PK_f5c9e9b16a5062629cd82396ac0" PRIMARY KEY ("workspaceId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_91c0ecc918a0f21f5394e79fc9" ON "workspace_users_users" ("workspaceId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8794cf9b22160745ee49a095db" ON "workspace_users_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "board" ADD CONSTRAINT "FK_394199497c0242b3270d03611bf" FOREIGN KEY ("workspaceId") REFERENCES "workspace"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workspace_users_users" ADD CONSTRAINT "FK_91c0ecc918a0f21f5394e79fc98" FOREIGN KEY ("workspaceId") REFERENCES "workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "workspace_users_users" ADD CONSTRAINT "FK_8794cf9b22160745ee49a095dbe" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workspace_users_users" DROP CONSTRAINT "FK_8794cf9b22160745ee49a095dbe"`);
        await queryRunner.query(`ALTER TABLE "workspace_users_users" DROP CONSTRAINT "FK_91c0ecc918a0f21f5394e79fc98"`);
        await queryRunner.query(`ALTER TABLE "board" DROP CONSTRAINT "FK_394199497c0242b3270d03611bf"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8794cf9b22160745ee49a095db"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_91c0ecc918a0f21f5394e79fc9"`);
        await queryRunner.query(`DROP TABLE "workspace_users_users"`);
        await queryRunner.query(`DROP TABLE "board"`);
        await queryRunner.query(`DROP TABLE "workspace"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
