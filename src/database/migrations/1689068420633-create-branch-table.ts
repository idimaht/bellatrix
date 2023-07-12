import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBranchTable1689068420633 implements MigrationInterface {
  name = 'CreateBranchTable1689068420633';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "managers" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "tel" character varying, "branchId" integer NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_e70b8cc457276d9b4d82342a8ff" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_97360c5e384d0d78fa8b57583d" ON "managers" ("deletedAt") `,
    );
    await queryRunner.query(
      `CREATE TABLE "branches" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "tel" character varying, "address" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_7f37d3b42defea97f1df0d19535" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_42e0bd68cc95a9912696ad3780" ON "branches" ("deletedAt") `,
    );
    await queryRunner.query(
      `ALTER TABLE "managers" ADD CONSTRAINT "FK_4f4b6fb23b1441cffe45d332dda" FOREIGN KEY ("branchId") REFERENCES "branches"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "managers" DROP CONSTRAINT "FK_4f4b6fb23b1441cffe45d332dda"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_42e0bd68cc95a9912696ad3780"`,
    );
    await queryRunner.query(`DROP TABLE "branches"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_97360c5e384d0d78fa8b57583d"`,
    );
    await queryRunner.query(`DROP TABLE "managers"`);
  }
}
