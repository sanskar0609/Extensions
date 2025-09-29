// test-mongo.js
const mongoose = require("mongoose");

const MONGO_URI = "mongodb+srv://sanskarsontakke06_db_user:Sanskar06@extensionsuser.l1dfibn.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=ExtensionsUser";

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));
