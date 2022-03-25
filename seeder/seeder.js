const connectDB = require('../DB/connectDB');
const colors = require('colors');

//  Read dummy data from json
const USERS = require('../data/users.json');
const TOURS = require('../data/tours.json');

//  Importing models
const User = require('../models/User');
const Tour = require('../models/Tour');

//  Pushing data to db
const pushJsonData = async (data, collection) => {
    await collection.insertMany(data);
}

//Delete all data
const deleteAllModelData = async (collection) => {
    await collection.deleteMany();
}

const addAllData = async () => {
    try{
        await pushJsonData(USERS, User);
        await pushJsonData(TOURS, Tour);
        console.log('all data is added'.bgBlue.white);
    }catch(err){
        console.log(`Error while seeding data ${err}` );
        process.exit(1);
    }
    
};

const removeAllData = async () => {
    try{
        await deleteAllModelData(User);
        await deleteAllModelData(Tour);
        console.log('all data is deleted'.bgGreen.white);
    }catch(err){
        console.log(`Error while deleteing data ${err.message}`.bgRed.white );
        process.exit(1);
    }
}

(async () => {
    const operation = process.argv[2];
    try{
        if(operation === 'i'){
            await connectDB('mongodb://127.0.0.1:27017/tours');
            await addAllData();
        }
        if(operation === 'd'){
            await connectDB('mongodb://127.0.0.1:27017/tours');
            await removeAllData();
        }
        process.exit(0);
    }catch(err){
        console.log(err.message);
        process.exit(1);
    }
})()

