const mongoose = require('mongoose');
const colors = require('colors');
const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to MongoDB ${con.connection.host} `.bgGreen);
  } catch (err) {
    console.log(`Error ${err.message}`.red.inverse);
    process.exit(1);
  }
};

module.exports = connectDB;
