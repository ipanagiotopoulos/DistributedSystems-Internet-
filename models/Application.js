// const Sequelize = require('../node_modules/sequelize')
// const db = require('../database/db.js')

// module.exports = db.sequelize.define('application', {
//     username: {
//       type: Sequelize.STRING,
//       primaryKey: true
//     },
//     department_name: {
//         type: Sequelize.ENUM('Informatics', 'Geography', 'Dietics', 'Economics'),
//     },
//     city: {
//         type: Sequelize.STRING,
//     },
//     personalIncome: {
//         type: Sequelize.INTEGER,
//     },
//     familyIncome: {
//         type: Sequelize.INTEGER,
//     },
//     parent1_employmentStatus: {
//         type: Sequelize.ENUM('emp', 'unemp'),
//     },
//     parent2_employmentStatus: {
//         type: Sequelize.ENUM('emp', 'unemp'),
//     },
//     siblingsStudents: {
//         type: Sequelize.INTEGER
//     },
//     active: {
//         type: Sequelize.ENUM('active','inactive'),
//     }
// }, {
//     freezeTableName: true,
//     timestamps: false,
// });