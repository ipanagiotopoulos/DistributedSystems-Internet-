require("dotenv").config();

const Sequelize = require('../node_modules/sequelize')
const db = {}

const sequelize = new Sequelize ({
    database: process.env.DATABASE,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    dialect: 'mysql',
    host: process.env.DBHOST,
    port: '3306'
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db