import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateIngredientAndMenuTable1689793617602
  implements MigrationInterface
{
  name = 'CreateIngredientAndMenuTable1689793617602';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "menus" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "amount" integer NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_3fec3d93327f4538e0cbd4349c4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_47a1afed0bca43f11d197a5111" ON "menus" ("deletedAt") `,
    );
    await queryRunner.query(
      `CREATE TABLE "ingredients" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "amount" integer NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_9240185c8a5507251c9f15e0649" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_906c94ddf0b89b08b201e21268" ON "ingredients" ("deletedAt") `,
    );
    await queryRunner.query(
      `CREATE TABLE "menu_ingredient" ("menu_id" integer NOT NULL, "ingredient_id" integer NOT NULL, CONSTRAINT "PK_c940794541d9c8e3fd4147b9108" PRIMARY KEY ("menu_id", "ingredient_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f1115138b5d1d103e9d21bfbf4" ON "menu_ingredient" ("menu_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2434545beae44f1fe16d9e4b93" ON "menu_ingredient" ("ingredient_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "menu_ingredient" ADD CONSTRAINT "FK_f1115138b5d1d103e9d21bfbf48" FOREIGN KEY ("menu_id") REFERENCES "menus"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "menu_ingredient" ADD CONSTRAINT "FK_2434545beae44f1fe16d9e4b933" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "menu_ingredient" DROP CONSTRAINT "FK_2434545beae44f1fe16d9e4b933"`,
    );
    await queryRunner.query(
      `ALTER TABLE "menu_ingredient" DROP CONSTRAINT "FK_f1115138b5d1d103e9d21bfbf48"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2434545beae44f1fe16d9e4b93"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f1115138b5d1d103e9d21bfbf4"`,
    );
    await queryRunner.query(`DROP TABLE "menu_ingredient"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_906c94ddf0b89b08b201e21268"`,
    );
    await queryRunner.query(`DROP TABLE "ingredients"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_47a1afed0bca43f11d197a5111"`,
    );
    await queryRunner.query(`DROP TABLE "menus"`);
  }
}
