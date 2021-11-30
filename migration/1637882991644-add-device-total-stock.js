const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class addDeviceTotalStock1637882991644 {
    name = 'addDeviceTotalStock1637882991644'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`device\` ADD \`totalStock\` int NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`device\` DROP COLUMN \`totalStock\``);
    }
}
