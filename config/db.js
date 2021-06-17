const { Sequelize } = require('sequelize');

// Option 1: Passing a connection URI
//const sequelize = new Sequelize('sqlite::memory:') // Example for sqlite
//const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') // Example for postgres

// Option 2: Passing parameters separately (sqlite)
//const sequelize = new Sequelize({
//  dialect: 'sqlite',
//  storage: 'path/to/database.sqlite'
//});

// Option 2: Passing parameters separately (other dialects)
require('dotenv').config({path: './var.env'})



//const db = new Sequelize('uptask', 'root', '', {
const db = new Sequelize(
    process.env.DB_DATABASE, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql', /*| 'mariadb' | 'postgres' | 'mssql'*/
    port:process.env.BD_PORT,
    define:{
        timestamps:false
    },
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    }
});
module.exports =db;