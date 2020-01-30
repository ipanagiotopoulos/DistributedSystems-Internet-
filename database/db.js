const Sequelize = require('../node_modules/sequelize')
const db = {}

const sequelize = new Sequelize ({
    database: 'webapplication',
    username: 'mantzarisvas',
    password: 'Mantzaris13',
    dialect: 'mysql',
    host: 'localhost',
    port: '3306'
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db