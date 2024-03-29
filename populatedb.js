const AccountTraining = require('./models/accountTraining');
const AccountEmployee = require('./models/accountEmployee');
const Person = require('./models/person');

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
    await createPerson();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
}

main().catch((err) => console.log(err));

const accounts = [];
const persons = [];

function md5Hash(inputString) {
    return crypto.createHash('md5').update(inputString).digest('hex');
}

async function accountTrainingCreate(index,accountCode, password, role) {
    const accountTraining = new AccountTraining({accountCode : accountCode, password : password, role : role});
    await accountTraining.save();
    accounts[index] = accountTraining;
    console.log(`Add account training: ${accountCode}`)
}

async function createAccountTraining() {
    console.log("Adding account training");
    await Promise.all([
        accountTrainingCreate(0, "715105165", md5Hash("1"), "s"),
        accountTrainingCreate(1, "715105166", md5Hash("2"), "s"),
        accountTrainingCreate(2, "715105167", md5Hash("3"), "s"),
    ])
}

async function accountEmployeeCreate(index, accountCode, password, role) {
    const accountEmployee = new AccountEmployee({accountCode : accountCode, password : password, role : role});
    await accountEmployee.save();
    accounts[index] = accountEmployee;
    console.log(`Add account Employee: ${accountCode}`)
}

async function createAccountEmployee() {
    console.log("Adding account Employee");
    await Promise.all([
        accountEmployeeCreate(3, "em1", md5Hash("1"), "admin"),
        accountEmployeeCreate(4, "em2", md5Hash("2"), "admin"),
        accountEmployeeCreate(5, "em3", md5Hash("3"), "admin"),
    ])
}

async function personCreate(index, personInfo, account) {
    const personDetails = {
        personInfo : personInfo,
        account : account
    }
    const person = new Person(personDetails);
    
    await person.save();
    persons[index] = person;
    console.log(`Add Person: ${account.accountCode}`)
}

async function createPerson() {
    console.log("Adding Person");
    await Promise.all([
        personCreate(1, "lao dong", accounts[1]),
        personCreate(2, "lao dong", accounts[2]),
        personCreate(3, "nhan vien", accounts[4]),
    ])
}

