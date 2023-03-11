const { default: mongoose } = require("mongoose");
const dbConnect = () => {
  try {
    const conn = mongoose.connect(process.env.MONGOODB_URL);
    console.log("Connected to server Successfully");
  } catch (e) {
    console.log("Database connection error")
  }
};
module.exports = dbConnect;
