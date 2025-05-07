import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInitialTables1709000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create posts table
    await queryRunner.query(`
      CREATE TABLE posts (
        id INT NOT NULL AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        author VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB;
    `);

    // Create comments table
    await queryRunner.query(`
      CREATE TABLE comments (
        id INT NOT NULL AUTO_INCREMENT,
        content TEXT NOT NULL,
        author VARCHAR(255) NOT NULL,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        postId INT NOT NULL,
        parentId INT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE,
        FOREIGN KEY (parentId) REFERENCES comments(id) ON DELETE CASCADE
      ) ENGINE=InnoDB;
    `);

    // Create keyword_notifications table
    await queryRunner.query(`
      CREATE TABLE keyword_notifications (
        id INT NOT NULL AUTO_INCREMENT,
        author VARCHAR(255) NOT NULL,
        keyword VARCHAR(255) NOT NULL,
        PRIMARY KEY (id),
        UNIQUE KEY unique_author_keyword (author, keyword)
      ) ENGINE=InnoDB;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS keyword_notifications`);
    await queryRunner.query(`DROP TABLE IF EXISTS comments`);
    await queryRunner.query(`DROP TABLE IF EXISTS posts`);
  }
}
