const Sequelize = require('../node_modules/sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define('authority', {
    username: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    authority: {
      type: Sequelize.STRING,
    }
}, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'authorities'
});