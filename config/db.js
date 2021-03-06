const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');
const connectDB = async () => {
  try {
    console.log('connecting Mongo-Atlas');
    await mongoose.connect(process.env.mongoURI || db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Atlas Connected');
  } catch (error) {
    console.log(error.message);
    //Exit Process with status failure code 1
    process.exit(1);
  }
};

module.exports = connectDB;
