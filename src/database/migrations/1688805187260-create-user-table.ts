import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1688805187260 implements MigrationInterface {
  name = 'CreateUserTable1688805187260';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2a32f641edba1d0f973c19cc94" ON "users" ("deletedAt") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2a32f641edba1d0f973c19cc94"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
