import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const dbFilename = process.env.KODIFIX_DB_FILE ?? String.raw`C:\sqlite\kodifix.db`;

export default class Database {
  async createUserIfNotExists(user) {
    this.db = await open({ filename: dbFilename, driver: sqlite3.Database });

    const existingUser = await this.db.get("SELECT * FROM users where id = $id", {
      $id: user.id,
    });

    if (!existingUser)
      await this.db.run("INSERT INTO users(id, email, name) VALUES($id, $email, $name)", {
        $id: user.id,
        $email: user.email,
        $name: user.name,
      });

    this.db.close();
  }

  async getAllUserLevels(userId) {
    this.db = await open({ filename: dbFilename, driver: sqlite3.Database });

    const result = await this.db.all("SELECT * FROM user_level where userId = $userId", {
      $userId: userId,
    });

    this.db.close();
    return result;
  }

  async getUserLevel(userId, levelId) {
    this.db = await open({ filename: dbFilename, driver: sqlite3.Database });

    const result = await this.db.get("SELECT * FROM user_level where userId = $userId AND levelId = $levelId", {
      $userId: userId,
      $levelId: levelId,
    });

    this.db.close();
    return result;
  }

  async addUserLevel(userId, levelId, score) {
    this.db = await open({ filename: dbFilename, driver: sqlite3.Database });

    await this.db.run("INSERT INTO user_level(userId, levelId, score) VALUES($userId, $levelId, $score)", {
      $userId: userId,
      $levelId: levelId,
      $score: score
    });

    this.db.close();
  }

  async updateUserLevel(userId, levelId, score) {
    this.db = await open({ filename: dbFilename, driver: sqlite3.Database });

    await this.db.run("UPDATE user_level set score = $score where userId = $userId AND levelId = $levelId", {
      $userId: userId,
      $levelId: levelId,
      $score: score
    });

    this.db.close();
  }
}