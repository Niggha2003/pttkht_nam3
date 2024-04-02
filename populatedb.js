const AccountTraining = require('./models/accountModels/accountTraining');
const AccountEmployee = require('./models/accountModels/accountEmployee');
const Person = require('./models/accountModels/person');

const mongoose = require('mongoose');
const crypto = require('crypto');

// để query không cần phải logic (strict)
mongoose.set("strictQuery", false);

const mongoDB = "mongodb://localhost:27017/pttkht_nam3";

const accounts = [];
const persons = [];


console.log("Tạo database tài khoản")

async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);

    console.log("Debug: Run query");

    await createPerson();
    await createAccountTraining();
    await createAccountEmployee();

    return {accounts, persons};
}

// main().catch((err) => console.log(err));

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
        accountTrainingCreate(0, "hs002", md5Hash("1"), "student", persons[0]),
        accountTrainingCreate(1, "hs003", md5Hash("1"), "student", persons[1]),
        accountTrainingCreate(2, "hs004", md5Hash("1"), "student", persons[2]),
        
        accountTrainingCreate(3, "gv10", md5Hash("1"), "teacher", persons[3]),
        accountTrainingCreate(4, "gv11", md5Hash("1"), "teacher", persons[4]),
        accountTrainingCreate(5, "gv12", md5Hash("1"), "teacher", persons[5]),
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
        accountEmployeeCreate(6, "em1", md5Hash("1"), "admin", persons[6]),
        accountEmployeeCreate(7, "em2", md5Hash("1"), "admin", persons[7]),
        accountEmployeeCreate(8, "em3", md5Hash("1"), "admin", persons[8]),
        accountEmployeeCreate(9, "em4", md5Hash("2"), "admin", persons[9]),
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
            personCreate(0, "p0", new Date("2000-02-19"),"fdjsiofjids", "030324324", "dh", [{name: "ielts", level: "6.5"}], "Hà Nội", {name: "Nguyễn văn Tự", relation: "Bố", phoneNumber: "03824324324"}, "fdjisojfds" ),
            personCreate(1, "p1", new Date("2000-02-19"),"fdjsiofjids", "030324324", "dh", [{name: "ielts", level: "6.5"}], "Hà Nội", {name: "Nguyễn văn Tự", relation: "Bố", phoneNumber: "03824324324"}, "fdjisojfds" ),
            personCreate(2, "p2", new Date("2003-05-25"),"fdjsiofjids", "04732894", "dh",[], "Hà Nội", {name: "Nguyễn văn Hoàng", relation: "Mẹ", phoneNumber: "09334324324"}, "fdjisojfds" ),
            personCreate(3, "p3", new Date("2001-07-30"),"fdjsiofjids", "03498324", "dh", [], "Hà Nội", {name: "Nguyễn Hồng Nhan", relation: "Bà", phoneNumber: "0555324324"}, "fdjisojfds" ),
            personCreate(4, "p4", new Date("1998-06-10"),"fdjsiofjids", "055767867", "dh", [], "Hà Nội", {name: "Nguyễn Lý Tuệ", relation: "Bà", phoneNumber: "03287473243"}, "fdjisojfds" ),
            personCreate(5, "p5", new Date("2000-02-19"),"fdjsiofjids", "030324324", "dh", [{name: "ielts", level: "6.5"}], "Hà Nội", {name: "Nguyễn văn Tự", relation: "Bố", phoneNumber: "03824324324"}, "fdjisojfds" ),
            personCreate(6, "p6", new Date("2000-02-19"),"fdjsiofjids", "030324324", "dh", [{name: "ielts", level: "6.5"}], "Hà Nội", {name: "Nguyễn văn Tự", relation: "Bố", phoneNumber: "03824324324"}, "fdjisojfds" ),
            personCreate(7, "p7", new Date("2000-02-19"),"fdjsiofjids", "030324324", "dh", [{name: "ielts", level: "6.5"}], "Hà Nội", {name: "Nguyễn văn Tự", relation: "Bố", phoneNumber: "03824324324"}, "fdjisojfds" ),
            personCreate(8, "p8", new Date("2000-02-19"),"fdjsiofjids", "030324324", "dh", [{name: "ielts", level: "6.5"}], "Hà Nội", {name: "Nguyễn văn Tự", relation: "Bố", phoneNumber: "03824324324"}, "fdjisojfds" ),
            personCreate(9, "p9", new Date("2000-02-19"),"fdjsiofjids", "030324324", "dh", [{name: "ielts", level: "6.5"}], "Hà Nội", {name: "Nguyễn văn Tự", relation: "Bố", phoneNumber: "03824324324"}, "fdjisojfds" ),
        ])
    }
// kết thúc khởi tạo thông tin người dùng

module.exports = main;


