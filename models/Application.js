const Sequelize = require('../node_modules/sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define('application', {
    username: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    department_name: {
      type: Sequelize.STRING,
    },
    city: {
        type: Sequelize.STRING,
    },
    personalIncome: {
        type: Sequelize.INTEGER,
    },
    familyIncome: {
        type: Sequelize.INTEGER,
    },
    parent1_employmentStatus: {
        type: Sequelize.STRING,
    },
    parent2_employmentStatus: {
        type: Sequelize.STRING,
    },
    siblingsStudents: {
        type: Sequelize.INTEGER
    },
    active: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true,
    timestamps: false,
});