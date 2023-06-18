// import { Sequelize } from 'sequelize';

// const sequelize = new Sequelize(
//     'customer_pref',
//     'cp',
//     'changeMeCp',
//     {
//         dialect: 'mysql',
//         host: "db",
//     }
// );



const { Sequelize } = require('sequelize');
import config from 'config';

const configuration:any = config.get('database');

// const sequelize = new Sequelize(configuration.DB_USER, configuration.MYSQL_DB, configuration.DB_PASS, {
//   dialect:'mysql',
//   host: configuration.DB_HOST,
// //   logging: configuration.logging,
// });

const sequelize = new Sequelize( "GB", "root","", {
  dialect: "mysql",
  host:'127.0.0.1' || 'localhost'
});

export { sequelize };