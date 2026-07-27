import dotenv from "dotenv";
dotenv.config();
import connectDB from "./src/config/Database.js";
import app from "./src/app.js";

connectDB().catch((err) => {
  console.log("Database connection failed:", err);
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});


