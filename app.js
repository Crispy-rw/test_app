require('dotenv').config()
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyparser from 'body-parser';
import path from 'path';
import cors from 'cors';

// dotenv.config();

const app = express();

app.use(morgan('combined'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/`));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
    res.status(200).json({
        status: 200,
        message: 'welcome to barefoot nomad'
    });
});

app.use(cors());

require('./index.js')(app);

export default app;