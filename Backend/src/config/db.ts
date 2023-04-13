import { Sequelize } from "sequelize";


    const sequelize = new Sequelize(process.env.MYSQL_DB!, process.env.DB_USER!, "", {
        dialect: "mysql",
        host: process.env.DB_HOST || 'localhost'
    });

export {sequelize} ;
