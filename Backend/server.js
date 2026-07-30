import dotenv from "dotenv";
dotenv.config();
import connectDB from "./src/config/Database.js";
import app from "./src/app.js";
import { testGemini } from "./src/services/ai.service.js";


testGemini()

connectDB().catch((err) => {
  console.log("Database connection failed:", err);
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});


