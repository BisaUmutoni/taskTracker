const express = require('express')
const app = express();
require('../database/db')
const cors = require ('cors');
const authRoutes = require ('./routes/auth.Routes')
const morgan = require('morgan')

app.use(cors());
app.use(morgan ('dev'));
app.use(express.json());
app.use('/auth', authRoutes);


const port = 4000;

app.listen(port,()=> {
    console.log ("server is running on port", port);
});