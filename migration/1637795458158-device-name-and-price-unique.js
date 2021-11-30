const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class deviceNameAndPriceUnique1637795458158 {
    name = 'deviceNameAndPriceUnique1637795458158'

    async up(queryRunner) {
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_ecc8c29e38b3d08dcb8e3ee326\` ON \`device\` (\`name\`, \`price\`)`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX \`IDX_ecc8c29e38b3d08dcb8e3ee326\` ON \`device\``);
    }
}
