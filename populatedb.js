const AccountTraining = require('./models/accountModels/accountTraining');
const AccountEmployee = require('./models/accountModels/accountEmployee');
const Person = require('./models/trainingSystemModels/person');

const mongoose = require('mongoose');
const crypto = require('crypto');

// để query không cần phải logic (strict)
mongoose.set("strictQuery", false);

// Get arguments passed on command line
// in here, it's url of your mongoDB
const userArgs = process.argv.slice(2);

const mongoDB = userArgs[0];

const accounts = [];
const persons = [];
const certificates = [];
const associateContacts = [];


console.log("Tạo database tài khoản test")

async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);

    console.log("Debug: Run query");

    await createPerson();
    await createAccountTraining();
    await createAccountEmployee();

    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
}

main().catch((err) => console.log(err));

//*** hàm chuyển string về mã băm
function md5Hash(inputString) {
    return crypto.createHash('md5').update(inputString).digest('hex');
}

//*** khởi tạo tài khoản đào tạo
async function accountTrainingCreate(index,accountCode, password, role, person) {
    const accountTraining = new AccountTraining({accountCode : accountCode, password : password, role : role, person : person});
    await accountTraining.save();
    accounts[index] = accountTraining;
    console.log(`Add account training: ${accountCode}`)
}

async function createAccountTraining() {
    console.log("Adding account training");
    await Promise.all([
        accountTrainingCreate(0, "715105165", md5Hash("1"), "student", persons[0]),
    ])
}
// kết thúc khởi tạo tài khoản đào tạo


//*** khởi tạo tài khoản nhân viên
async function accountEmployeeCreate(index, accountCode, password, role, person) {
    const accountEmployee = new AccountEmployee({accountCode : accountCode, password : password, role : role, person : person});
    await accountEmployee.save();
    accounts[index] = accountEmployee;
    console.log(`Add account Employee: ${accountCode}`)
}

async function createAccountEmployee() {
    console.log("Adding account Employee");
    await Promise.all([
        accountEmployeeCreate(3, "em1", md5Hash("1"), "admin", persons[1]),
        accountEmployeeCreate(4, "em2", md5Hash("2"), "admin", persons[2]),
    ])
}
// kết thúc khởi tạo tài khoản nhân viên


//*** khởi tạo thông tin người dùng
    async function personCreate(index, name, birthDate, photo, phoneNumber, academicLevel, anotherCertificate, address, associateContact, identifyCard) {
        const personDetails = {
            name, birthDate, photo, phoneNumber, academicLevel, anotherCertificate, address, associateContact, identifyCard
        }
        const person = new Person(personDetails);
        
        await person.save();
        persons[index] = person;
        console.log(`Add Person: ${name}`)
    }

    async function createPerson() {
        console.log("Adding Person");
        await Promise.all([
            personCreate(0, "Hoàng", new Date("2000-02-19"),"fdjsiofjids", "030324324", "dh", [{name: "ielts", level: "6.5"}], "Hà Nội", {name: "Nguyễn văn Tự", relation: "Bố", phoneNumber: "03824324324"}, "fdjisojfds" ),
            personCreate(1, "Nam", new Date("2003-05-25"),"fdjsiofjids", "04732894", "dh",[], "Hà Nội", {name: "Nguyễn văn Hoàng", relation: "Mẹ", phoneNumber: "09334324324"}, "fdjisojfds" ),
            personCreate(2, "Minh", new Date("2001-07-30"),"fdjsiofjids", "03498324", "dh", [], "Hà Nội", {name: "Nguyễn Hồng Nhan", relation: "Bà", phoneNumber: "0555324324"}, "fdjisojfds" ),
        ])
    }
// kết thúc khởi tạo thông tin người dùng


