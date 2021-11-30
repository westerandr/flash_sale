const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class addCascadeDeleteOnUserToSale1638250258666 {
    name = 'addCascadeDeleteOnUserToSale1638250258666'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`sale\` DROP FOREIGN KEY \`FK_bf176f13c0bce3c693b24523794\``);
        await queryRunner.query(`ALTER TABLE \`sale\` ADD CONSTRAINT \`FK_bf176f13c0bce3c693b24523794\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`sale\` DROP FOREIGN KEY \`FK_bf176f13c0bce3c693b24523794\``);
        await queryRunner.query(`ALTER TABLE \`sale\` ADD CONSTRAINT \`FK_bf176f13c0bce3c693b24523794\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
