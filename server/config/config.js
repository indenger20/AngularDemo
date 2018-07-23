const path = require('path');
const merge =  require('lodash').merge;

const env = (process.env.NODE_ENV || 'production');

const base = {
  app: {
    env,
    root: path.normalize(path.join(__dirname, '/..')),
  },
};

const specific = {
  dev: {
    app: {
      port: 3000,
      secretkey: 'secretkey',
    },
    imagesFolder: 'images',
    db: {
      user: 'root',
      pass: 'pass2sql',
      database: 'angular_db',
      config: {
        host: 'localhost',
        dialect: 'mysql',
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
        define: {
          timestamps: false,
        },
      },
    },
    store: {
      username: 'root',
      password: 'pass2sql',
      database: 'angular_db',
      options: {
        dialect: 'mysql',
        host: 'localhost',
      },
    },
    pagination: {
      limit: 9,
    }
  },
};

module.exports = merge(base, specific.dev);
