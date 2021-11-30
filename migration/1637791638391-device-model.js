const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class deviceModel1637791638391 {
    name = 'deviceModel1637791638391'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`device\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`stock\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE \`device\``);
    }
}
