const AccountTraining = require('./models/accountTraining');
const AccountEmployee = require('./models/accountEmployee');

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
    await createAccountEmployee();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
}

main().catch((err) => console.log(err));

function md5Hash(inputString) {
    return crypto.createHash('md5').update(inputString).digest('hex');
}

async function accountTrainingCreate(accountCode, password, role) {
    const accountTraining = new AccountTraining({accountCode : accountCode, password : password, role : role});
    await accountTraining.save();
    console.log(`Add account training: ${accountCode}`)
}

async function createAccountTraining() {
    console.log("Adding account training");
    await Promise.all([
        accountTrainingCreate("715105165", md5Hash("1"), "s"),
        accountTrainingCreate("715105166", md5Hash("2"), "s"),
        accountTrainingCreate("715105167", md5Hash("3"), "s"),
    ])
}

async function accountEmployeeCreate(accountCode, password, role) {
    const accountEmployee = new AccountEmployee({accountCode : accountCode, password : password, role : role});
    await accountEmployee.save();
    console.log(`Add account Employee: ${accountCode}`)
}

async function createAccountEmployee() {
    console.log("Adding account Employee");
    await Promise.all([
        accountEmployeeCreate("em1", md5Hash("1"), "admin"),
        accountEmployeeCreate("em2", md5Hash("2"), "admin"),
        accountEmployeeCreate("em3", md5Hash("3"), "s"),
    ])
}

