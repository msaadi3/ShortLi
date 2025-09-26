import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    mongoose.set('debug', true);
    const connectionResponse = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DB}`
    );
    console.log(
      'MongoDB connected!! connection host: ',
      connectionResponse.connection.host
    );
    // console.log('connectionResponse: ', connectionResponse)
  } catch (error) {
    console.log(
      'error while connecting with database in db/index.js file ',
      error
    );
    process.exit(1);
  }
};

export default connectDB;
