import {MigrationInterface, QueryRunner, TableIndex} from 'typeorm';

export class AddUniqueUsernameToUsers1608436996149 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createIndex('users', /* 创建索引 */
      new TableIndex({
        name: 'users_username',
        columnNames: ['username'],
        isUnique: true
      }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('users','users_username')
  }
}
