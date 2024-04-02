const mongoose = require('mongoose');
const crypto = require('crypto');

const AccountTraining = require('./models/accountModels/accountTraining');
const AccountEmployee = require('./models/accountModels/accountEmployee');
const Person = require('./models/accountModels/person');

const TrainingClass = require('./models/trainingSystemModels/trainingClass');
const Mark = require('./models/trainingSystemModels/mark');
const Student = require('./models/trainingSystemModels/student');
const Subject = require('./models/trainingSystemModels/subject');
const Teacher = require('./models/trainingSystemModels/teacher');
const TrainingCourse = require('./models/trainingSystemModels/trainingCourse');
const Worker = require('./models/workingModels/worker');
const Apply = require('./models/signingModels/apply');
const Flight = require('./models/orderModels/flight');
const Order = require('./models/orderModels/order');
const LearningDoc = require('./models/trainingSystemModels/learningDoc');


// để query không cần phải logic (strict)
mongoose.set("strictQuery", false);

const mongoDB = "mongodb://localhost:27017/pttkht_nam3";

const trainingClasses = [];
const marks = [];
const students = [];
const subjects = [];
const teachers = [];
const trainingCourses = [];
const applies = [];
const flights = [];
const orders = [];
const workers = [];
const learningDocs = [];
const accounts = [];
const persons = [];

console.log("Tạo csdl đào tạo")

async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);

    console.log("Debug: Run query");
    await createPerson();
    await createAccountTraining();
    await createAccountEmployee();

    await createWorker();
    await createStudent();
    await createSubject();
    await createTeacher();
    await createMark();
    await createOrder();
    await createLearningDoc();
    await createApply();
    await createTrainingClass();
    await createTrainingCourse();

    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
}

main().catch((err) => console.log(err));

//** Tạo trainingClass */
async function trainingClassCreate(index, name, description, students, dayOfWeek, dayStart, dayEnd, timeStart, timeEnd, teacher, subject, learningDocs, marks ) {
    const trainingClass = new TrainingClass({
        name, description, students, dayOfWeek, dayStart, dayEnd, timeStart, timeEnd, teacher, subject, learningDocs, marks 
    });
    await trainingClass.save();
    trainingClasses[index] = trainingClass;
    console.log(`Add trainingClass ${index}`)
}

async function createTrainingClass() {
    await Promise.all([
        trainingClassCreate(0, "K10-C1", "Lớp tiếng Nhật", [students[0],students[1], students[2]], 0,
                                new Date(2024, 9, 30), new Date(2025, 1, 30), 
                                {hour: "2", minute: "00", TOD: "pm"}, {hour: "6", minute: "00", TOD: "pm"}, 
                                teachers[0], subjects[0], [learningDocs[0], learningDocs[2] ], [marks[0], marks[1], marks[2]]),
        trainingClassCreate(1, "K10-C2", "Lớp cơ khí", [students[0],students[1], students[2]], 3,
                                new Date(2024, 9, 30), new Date(2025, 1, 30), 
                                {hour: "2", minute: "00", TOD: "pm"}, {hour: "6", minute: "00", TOD: "pm"}, 
                                teachers[2], subjects[3], [learningDocs[1]], [marks[3], marks[4], marks[5]]),
    ])
}
// Kết thúc tạo trainingClass

//** Tạo student */
async function studentCreate(index, accountTraining, worker ) {
    const student = new Student({
        accountTraining, worker
    });
    await student.save();
    students[index] = student;
    console.log(`Add student ${index}`)
}

async function createStudent() {
    await Promise.all([
        studentCreate(0, accounts[0], workers[0]),
        studentCreate(1, accounts[1], workers[1]),
        studentCreate(2, accounts[2], workers[2]),
    ])
}
// Kết thúc tạo student

//** Tạo subject */
async function subjectCreate(index, name, description ) {
    const subject = new Subject({
        name, description
    });
    await subject.save();
    subjects[index] = subject;
    console.log(`Add subject ${index}`)
}

async function createSubject() {
    await Promise.all([
        subjectCreate(0, "Tiếng Nhật", "Dạy tiếng Nhật"),
        subjectCreate(1, "Dệt may", "Dạy các công việc cơ bản cho dệt may"),
        subjectCreate(2, "Xây dựng", "Dạy các công việc cơ bản cho xây dựng"),
        subjectCreate(3, "Cơ khí", "Dạy các công việc cơ bản cho cơ khí"),
        subjectCreate(4, "Nông nghiệp", "Dạy các công việc cơ bản cho nông nghiệp"),
    ])
}
// Kết thúc tạo subject

//** Tạo teacher */
async function teacherCreate(index, accountTraining, subjects) {
    const teacher = new Teacher({
        accountTraining, subjects
    });
    await teacher.save();
    teachers[index] = teacher;
    console.log(`Add teacher ${index}`)
}

async function createTeacher() {
    await Promise.all([
        teacherCreate(0, accounts[3], [subjects[0], subjects[1]]),
        teacherCreate(1, accounts[4], [subjects[3], subjects[4]]),
        teacherCreate(2, accounts[5], [subjects[2], subjects[0], subjects[3]])
    ])
}
// Kết thúc tạo teacher

//** Tạo mark */
async function markCreate(index, middleMark, finalMark, student) {
    const mark = new Mark({
        middleMark, finalMark, student
    });
    await mark.save();
    marks[index] = mark;
    console.log(`Add mark ${index}`)
}

async function createMark() {
    await Promise.all([
        markCreate(0, 7.6, 8.7, students[0]),
        markCreate(1, 7, 3, students[1]),
        markCreate(2, 9, 8, students[2]),
        markCreate(3, 6, 10, students[0]),
        markCreate(4, 2, 5, students[1]),
        markCreate(5, 8, 8, students[2])
    ])
}
// Kết thúc tạo mark

//** Tạo trainingCourse */
async function trainingCourseCreate(index, name, description, students, trainingClasses ) {
    const trainingCourse = new TrainingCourse({
        name, description, students, trainingClasses
    });
    await trainingCourse.save();
    trainingCourses[index] = trainingCourse;
    console.log(`Add trainingCourse ${index}`)
}

async function createTrainingCourse() {
    await Promise.all([
        trainingCourseCreate(0, "K10", "Xuất khẩu lao động ngành cơ khí Nhật", [students[0],students[1], students[2]], [trainingClasses[0], trainingClasses[1] ] ),
    ])
}
// Kết thúc tạo trainingCourse

//** Tạo worker */
async function workerCreate(index, isMarried) {
    const worker = new Worker({
        isMarried
    });
    await worker.save();
    workers[index] = worker;
    console.log(`Add worker ${index}`)
}

async function createWorker() {
    await Promise.all([
        workerCreate(0,false),
        workerCreate(1,false),
        workerCreate(2,false),
    ])
}
// Kết thúc tạo worker

//** Tạo apply */
async function applyCreate(index, phoneNumber, email, name, birthDate, order, state) {
    const apply = new Apply({
        phoneNumber, email, name, birthDate, order, state
    });
    await apply.save();
    applies[index] = apply;
    console.log(`Add apply ${index}`)
}

async function createApply() {
    await Promise.all([
        applyCreate(0, "0976760298", "ngnisf@gmail.com", "p0", new Date("2000-02-19"), orders[0]),
        applyCreate(1, "0348024832", "fdsfd@gmail.com", "p1", new Date("2000-02-19"), orders[0]),
        applyCreate(2, "0574893247", "gregeg@gmail.com", "p2", new Date("2000-05-25"), orders[0]),
    ])
}
// Kết thúc tạo apply

//** Tạo order */
async function orderCreate(index, companyName, companyAddress, jobDescription, quantityRequire, ageRequire, heightRequire, weightRequire, bodyRequire, academicLevelRequire, salary, timeNeeded, state, type, employee, workers) {
    const order = new Order({
        companyName, companyAddress, jobDescription, quantityRequire, ageRequire, heightRequire, weightRequire, bodyRequire, academicLevelRequire, salary, timeNeeded, state, type, employee, workers
    });
    await order.save();
    orders[index] = order;
    console.log(`Add order ${index}`)
}

async function createOrder() {
    await Promise.all([
        orderCreate(0, "Hisoka", "Tokyo....", "Bảo dưỡng máy móc", {male: 5, female: 5}, 18, {male: 170, female: 160}, {male: 55, female: 45}, {eyesight: "7:7", isSmoke : true}, "pt", "145.000", new Date(2025-2-28), "training", "Cơ khí Nhật", accounts[9], [workers[0], workers[1], workers[2]]),
    ])
}
// Kết thúc tạo apply

//** Tạo flight */
// async function flightCreate(index, airlineName, flightNumber, ticketClass, from, to, time, airlineGateway, flightSeat, worker, employee) {
//     const flight = new Flight({
//         airlineName, flightNumber, ticketClass, from, to, time, airlineGateway, flightSeat, worker, employee
//     });
//     await flight.save();
//     flights[index] = flight;
//     console.log(`Add flight ${index}`)
// }

// async function createFlight() {
//     await Promise.all([
//         flightCreate(0,false),
//         flightCreate(1,false),
//         flightCreate(2,false),
//     ])
// }
// Kết thúc tạo flight

//** Tạo learningDoc */
async function learningDocCreate(index, name, path) {
    const learningDoc = new LearningDoc({
        name, path
    });
    await learningDoc.save();
    learningDocs[index] = learningDoc;
    console.log(`Add learningDoc ${index}`)
}

async function createLearningDoc() {
    await Promise.all([
        learningDocCreate(0,"Tiếng Nhật cơ bản", "dsfsdfdsfsdf"),
        learningDocCreate(1,"Cơ khí cơ bản", "dsfsdfdsfsdf"),
        learningDocCreate(2,"Tiếng Nhật nâng cao", "dsfsdfdsfsdf"),
    ])
}
// Kết thúc tạo learningDoc

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

