const client = require('../db/client');
const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports = {
  async getUserByName(username) {
    try {
      const user = await client.then(conn => conn.query(`SELECT id, username, password FROM users WHERE username = '${username}'`));
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
  async getAllUsers() {
    try {
      const users = await client.then(conn => conn.query(`SELECT id, username, firstname, lastname FROM users`));
      return users;
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
      if (bcrypt.compareSync(password, user.password)) {
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
  },
  async registration({ username, password, lastname, firstname }) {
    try {
      const thisUser = await this.getUserByName(username);
      if (thisUser) {
        return "This username is not free"
      }
      let hash = bcrypt.hashSync(password, 10);
      const result = await client.then(conn => conn.query(`INSERT INTO users (username, password, firstname, lastname) VALUES ('${username}', '${hash}', '${firstname}', '${lastname}')`));
      const user = await this.getUserById(result.insertId);
      return user;
    } catch (err) {
      throw new Error(err);
    }

  }
}