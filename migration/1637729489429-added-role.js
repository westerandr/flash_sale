const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class addedRole1637729489429 {
    name = 'addedRole1637729489429'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`role\` varchar(255) NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`role\``);
    }
}
