import NodeCache from 'node-cache';
import axios from 'axios';
import Database from './db.js';

export default class UserManager {
  constructor() {
    this.cache = new NodeCache();
  }

  getUser = async (accessToken) => {
    const cachedUser = this.cache.get(accessToken);
    if (!!cachedUser)
      return cachedUser;
    
    try {
      const response = await axios.get('https://login.yandex.ru/info', { headers: {"Authorization" : `OAuth ${accessToken}` } })
      if (response.status === 200) {
        var db = new Database();
        const dbUser = await db.getUser(response.data.id);
        const user = { id: response.data.id, email: response.data.default_email, name: response.data.real_name, hasAccess: dbUser?.hasAccess ?? 0 };
        this.cache.set(accessToken, user, 600);
        return user;
      }
      else {
        console.log(`Ошибка при попытке получить данные пользователя Яндекса`, response.status, response.data);
      }
    } catch (e) {
      console.log(`Ошибка при попытке получить данные пользователя Яндекса`, e);
    }
  }
}