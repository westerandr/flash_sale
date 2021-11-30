const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class saleAndRelations1637794161515 {
    name = 'saleAndRelations1637794161515'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`sale\` (\`id\` int NOT NULL AUTO_INCREMENT, \`store\` varchar(255) NOT NULL, \`date\` datetime NOT NULL, \`price\` int NOT NULL, \`deviceId\` int NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`device\` CHANGE \`stock\` \`stock\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`sale\` ADD CONSTRAINT \`FK_0c91e9e7f99f2f8ecea8a50ce25\` FOREIGN KEY (\`deviceId\`) REFERENCES \`device\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sale\` ADD CONSTRAINT \`FK_bf176f13c0bce3c693b24523794\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`sale\` DROP FOREIGN KEY \`FK_bf176f13c0bce3c693b24523794\``);
        await queryRunner.query(`ALTER TABLE \`sale\` DROP FOREIGN KEY \`FK_0c91e9e7f99f2f8ecea8a50ce25\``);
        await queryRunner.query(`ALTER TABLE \`device\` CHANGE \`stock\` \`stock\` int NOT NULL`);
        await queryRunner.query(`DROP TABLE \`sale\``);
    }
}
