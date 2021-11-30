const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class addCascadeDeleteOnDeviceToSale1638229341526 {
    name = 'addCascadeDeleteOnDeviceToSale1638229341526'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`sale\` DROP FOREIGN KEY \`FK_0c91e9e7f99f2f8ecea8a50ce25\``);
        await queryRunner.query(`ALTER TABLE \`sale\` ADD CONSTRAINT \`FK_0c91e9e7f99f2f8ecea8a50ce25\` FOREIGN KEY (\`deviceId\`) REFERENCES \`device\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`sale\` DROP FOREIGN KEY \`FK_0c91e9e7f99f2f8ecea8a50ce25\``);
        await queryRunner.query(`ALTER TABLE \`sale\` ADD CONSTRAINT \`FK_0c91e9e7f99f2f8ecea8a50ce25\` FOREIGN KEY (\`deviceId\`) REFERENCES \`device\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
