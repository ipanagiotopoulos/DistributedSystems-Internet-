// const Sequelize = require('../node_modules/sequelize')
// const db = require('../database/db.js')

// module.exports = db.sequelize.define('user_information', {
//     username: {
//       type: Sequelize.STRING,
//       primaryKey: true
//     },
//     name: {
//       type: Sequelize.STRING,
//     },
//     email: {
//         type: Sequelize.STRING,
//     },
//     department_name: {
//         type: Sequelize.ENUM('Informatics', 'Geography', 'Dietics', 'Economics'),
//     },
//     points: {
//         type: Sequelize.INTEGER,
//     },
//     activated: {
//         type: Sequelize.ENUM('active','inactive'),
//     }
// }, {
//     freezeTableName: true,
//     timestamps: false
// });