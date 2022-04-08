const Sequelize = require("sequelize");
const config = require("./config.json");
let db;

if (process.env.NODE_ENV === "development") {
  const { database, username, password, host, dialect } = config.development;
  db = new Sequelize(database, username, password, {
    host,
    dialect,
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  });
} else {
  const { database, username, password, host, dialect } = config.production;
  db = new Sequelize(database, username, password, {
    host,
    dialect,
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  });
}

module.exports = db;
