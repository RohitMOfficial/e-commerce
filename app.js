const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');



const server = express();
require('dotenv').config()


const PORT = process.env.PORT || 5000;
const DB = process.env.DATABASE;
const authRouter = require('./Router/auth')
const userRoutes = require('./Router/user');
const categoryRoutes = require('./Router/category');
const braintreeRoutes = require('./Router/braintree')
const productRoutes = require('./Router/product');
const orderRoutes = require('./Router/order');


mongoose.connect(DB, {
    useNewUrlParser: true
}).then(() => {
    console.log("connected to DB");
}).catch(err => {
    console.log(err);
})

server.use(cookieParser());
server.use(expressValidator())
server.use(cors());
server.use(morgan('dev'));
server.use(bodyParser.json());
server.use('/api', authRouter);
server.use('/api', userRoutes);
server.use('/api', categoryRoutes)
server.use('/api', productRoutes);
server.use('/api', braintreeRoutes);
server.use('/api', orderRoutes);

// deploying on heroku part of code
__dirname = path.resolve();
if (process.env.NODE_ENV == "production") {
    server.use(express.static(path.join(__dirname, '/ecommerce-frontend/build')))
    server.get("*", (req, res) => {

        res.sendFile(path.resolve(__dirname, 'ecommerce-frontend', 'build', 'index.html'));

    })
}
else{
    server.get('/',(req,res)=>{
        res.send("app is running");
    })
}


// if ( process.env.NODE_ENV == "production"){

//     app.use(express.static("ecommerce-frontend/build"));




//     const path = require("path");

//     app.get("*", (req, res) => {

//         res.sendFile(path.resolve(__dirname, 'ecommerce-frontend', 'build', 'index.html'));

//     })


// }



server.listen(PORT, () => {
    console.log('Server is running at ', PORT);
})