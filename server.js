/* eslint-disable import/no-cycle */
require('dotenv').config()
import http from 'http';

// import Promise from 'bluebird';
import dotenv from 'dotenv';

import models from './api/models';
import app from './app';

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const { sequelize } = models;

dotenv.config();

// const users = process.env.USERS ? JSON.parse(process.env.USERS) : [];

sequelize
    .sync({
        force: false,
        logging: console.log
    }).then(async () => {
        await console.log('created');
    });


export default app.listen(PORT, '0.0.0.0', () => { console.log(`port listening on port ${PORT}`) });

// import express from 'express'
// const app = express()
// const routes = require('./api/routes/auth')
// // const models = require("./api/models")
// const { sequelize} = models;
// const Promise = require('bluebird')
// const bodyparser = require('body-parser')
// app.use(bodyparser.json());
// app.use(bodyparser.urlencoded({ extended: true }));



// const Port = process.env.PORT || 3000;



// app.use('/', (req, res) => {
//     res.send('bro we here');
// });

// const server = app.listen(Port, () => {
//     console.log(`listen to port ${Port}`)
//     sequelize.sync({ force: true }).then(async () => {
//         await console.log('bro we here')
//     })


// })

// export default server;