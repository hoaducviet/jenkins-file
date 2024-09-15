const mongoose = require('mongoose');
const mongodbURI2 = "mongodb+srv://viethoa:viethoa123465@cluster0.oxuq9hf.mongodb.net/ITSS_DB?retryWrites=true&w=majority";
const mongodbURI1 = "mongodb+srv://viethoang:viethoang21@cluster0.3hvcfxo.mongodb.net/mom_baby?retryWrites=true&w=majority"
const mongodbURI= 'mongodb://127.0.0.1:27017/nodejs_demo';

async function connect() {
    try {
        await mongoose.connect(mongodbURI);
        console.log('Connected');
    } catch (error) {
        console.log('Failed');
    }
}

module.exports = { connect, mongodbURI };
