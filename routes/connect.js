const mongoose = require('mongoose')
mongoose.set("strictQuery", false);

const mongoDB = "mongodb://localhost:27017/pttkht_nam3";

async function main() {
    await mongoose.connect(mongoDB);
}

exports.connect = () => {
    main().catch((err) => console.log(err));
}

exports.close = () => {
    mongoose.connection.close();
}