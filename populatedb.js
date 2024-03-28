const AccountTraining = require('./models/accountTraining');
const Account = require('./models/account');
const mongoose = require('mongoose');
const crypto = require('crypto');

mongoose.set("strictQuery", false);

// Get arguments passed on command line
// in here, it's url of your mongoDB
const userArgs = process.argv.slice(2);

const mongoDB = userArgs[0];


console.log("Tạo database tài khoản test")

async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Run query");
    await createAccountTraining();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
}


const accountTrainings = [];
const accounts = [];


main().catch((err) => console.log(err));

function md5Hash(inputString) {
    return crypto.createHash('md5').update(inputString).digest('hex');
}

async function accountTrainingCreate(index, accountCode, password) {
    const accountTraining = new AccountTraining({accountCode : accountCode, password : password});
    await accountTraining.save();
    accountTrainings[index] = accountTraining;
    console.log(`Add account training: ${accountCode}`)
}

async function createAccountTraining() {
    console.log("Adding account training");
    await Promise.all([
        accountTrainingCreate(0,"715105165", md5Hash("1")),
        accountTrainingCreate(1,"715105166", md5Hash("2")),
        accountTrainingCreate(2,"715105167", md5Hash("3")),
        accountTrainingCreate(3,"715105168", md5Hash("4")),
    ])
}

async function accountCreate(index, accountCode, password) {
    const account = new Account({accountCode : accountCode, password : password});
    await account.save();
    accounts[index] = account;
    console.log(`Add account: ${accountCode}`)
}

async function createAccount() {
    console.log("Adding account");
    await Promise.all([
        accountCreate(0,"hhh1", md5Hash("1")),
        accountCreate(1,"hhh2", md5Hash("2")),
        accountCreate(2,"hhh3", md5Hash("3")),
        accountCreate(3,"hhh4", md5Hash("4")),
    ])
}