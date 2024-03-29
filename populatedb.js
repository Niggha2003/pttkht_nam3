const AccountTraining = require('./models/accountTraining');
const AccountEmployee = require('./models/accountEmployee');
const Person = require('./models/person');
const AssociateContact = require('./models/associateContact');
const Certificate = require('./models/certificate');

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

    await createAnotherCertificate();
    await createAssociateContact();
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
        accountTrainingCreate(0, "715105165", md5Hash("1"), "s", persons[0]),
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

/// khởi tạo chứng chỉ khác

/// kết thúc khởi tạo chứng chỉ khác
    async function anotherCertificateCreate(index, certificateName, level) {
        const certificate = new Certificate({certificateName: certificateName, level: level});
        await certificate.save();
        certificates[index] = certificate;
    }

    async function createAnotherCertificate() {
        await Promise.all([
            anotherCertificateCreate(0, "ielts", "6.5"),
            anotherCertificateCreate(1, "Toeic", "6.5"),
            anotherCertificateCreate(2, "Tiếng Nhật", "N2"),
        ])
    }
/// khởi tạo người liên hệ
    async function associateContactCreate(index, name, relation, phoneNumber) {
        const associateContact = new AssociateContact({name : name, relation : relation, phoneNumber : phoneNumber});
        await associateContact.save();
        associateContacts[index] = associateContact;
    }

    async function createAssociateContact() {
        await Promise.all([
            associateContactCreate(0, "Nguyễn văn Tự", "Bố", "03824324324"),
            associateContactCreate(1, "Nguyễn văn Hoàng", "Mẹ", "09334324324"),
            associateContactCreate(2, "Nguyễn Hồng Nhan", "Bà", "0555324324"),
        ])
    }
/// kết thúc khởi tạo người liên hệ


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
            personCreate(0, "Hoàng", new Date("2000-02-19"),"fdjsiofjids", "030324324", "dh", certificates[0], "Hà Nội", associateContacts[0], "fdjisojfds" ),
            personCreate(1, "Nam", new Date("2003-05-25"),"fdjsiofjids", "04732894", "dh", certificates[1], "Hà Nội", associateContacts[1], "fdjisojfds" ),
            personCreate(2, "Minh", new Date("2001-07-30"),"fdjsiofjids", "03498324", "dh", certificates[2], "Hà Nội", associateContacts[2], "fdjisojfds" ),
        ])
    }
// kết thúc khởi tạo thông tin người dùng


