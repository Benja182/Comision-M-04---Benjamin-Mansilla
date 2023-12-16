console.log('Hola')
const express = require("express");


const app = express();
const PORT = process.env.PORT || 3001;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });


const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));