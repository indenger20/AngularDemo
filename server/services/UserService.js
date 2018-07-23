const client = require('../db/client');

module.exports = {
  async getUserByName(username) {
    try {
      const user = await client.then(conn => conn.query(`SELECT id, username, password, 'group' FROM users WHERE username = '${username}'`));
      return user[0];
    } catch (err) {
      throw new Error(err);
    }
  },
  async getUserById(id) {
    try {
      const user = await client.then(conn => conn.query(`SELECT id, username, 'group' FROM users WHERE id = ${id}`));
      return user[0];
    } catch (err) {
      throw new Error(err);
    }
  },
  async authenticate(username, password) {
    try {
      if (!username && !password) {
        throw new Error('Empty fields');
      }
      const user = await this.getUserByName(username);
      if (user === undefined) {
        throw new Error('Incorrect username');
      }
      if (user.password === password) {
        return user;
      } else {
        throw new Error('Incorrect password');
      }
    } catch (err) {
      throw new Error(err);
    }

  },
  isAdmin(user) {
    return user.group === 'admin';
  }
}