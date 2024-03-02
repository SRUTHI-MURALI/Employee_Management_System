import mongoose from "mongoose";

const connectDB = () => {
 try {
  mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error(err);
  });
  
 } catch (error) {
  console.log(error);
  
 }
};

export default connectDB;
