import mongoose from "mongoose";

const mongoconn = async () => {
  mongoose.connect("mongodb://127.0.0.1:27017/Fullskill");
};

export default mongoconn;
