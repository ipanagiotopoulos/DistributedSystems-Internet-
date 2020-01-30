const Sequelize = require('../node_modules/sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define('user_information', {
    username: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.INTEGER,
    },
    department_name: {
        type: Sequelize.STRING,
    },
    points: {
        type: Sequelize.STRING,
    },
    activated: {
        type: Sequelize.STRING,
    }
}, {
    freezeTableName: true,
    timestamps: false
});