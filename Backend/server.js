import dotenv from "dotenv";
dotenv.config();
import http from "http";
import connectDB from "./src/config/Database.js";
import app from "./src/app.js";
//import { testGemini } from "./src/services/ai.service.js";
import { initializeSocketServer } from "./src/sockets/server.socket.js";


//testGemini()

const httpServer = http.createServer(app);
initializeSocketServer(httpServer);

connectDB().catch((err) => {
  console.log("Database connection failed:", err);
});

httpServer.listen(3000, () => {
  console.log("server is running on port 3000");
});


