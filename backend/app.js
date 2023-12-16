const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const errorHandler = require("./middlewares/errorHandler");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// Conexion MongoDb
const connectDB = async () => {
  try {
      console.log('Estableciendo conexión a la base de datos...')
      await mongoose.connect(process.env.MONGO_DB_URI)
      console.log('\x1b[32m%s\x1b[0m', 'Base de datos conectada');

  } catch (error) {
      console.log('Error:', error)
  }
}
connectDB()

//mongoose.connect(process.env.MONGODB_URI, {
//  useNewUrlParser: true,
//  useUnifiedTopology: true,
//});
//const db = mongoose.connection;
//db.on("error", console.error.bind(console, "MongoDB connection error:"));
//db.once("open", () => console.log("Connected to MongoDB"));

// Rutas
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");

app.use(errorHandler);

app.use("/api/posts", require("./middlewares/validationMiddleware"));

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
