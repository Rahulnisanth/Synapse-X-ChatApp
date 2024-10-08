import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import auth_route from "./routes/auth_routes.js";
import contact_route from "./routes/contact_routes.js";
import { setUpSocket } from "./socket.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;
const database_url = process.env.DATABASE_URL;

app.use(
  cors({
    origin: process.env.ORIGIN || "http://localhost:5173",
    methods: ["POST", "PUT", "GET", "PATCH", "DELETE"],
    credentials: true,
  })
);

// Handle preflight requests
app.options("*", cors());
app.use("/uploads/profiles", express.static("uploads/profiles"));

app.use(cookieParser());
app.use(express.json());

// Auth routes
app.use("/api/auth", auth_route);
// Contact routes
app.use("/api/contact", contact_route);

const server = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/`);
});

setUpSocket(server);

mongoose
  .connect(database_url)
  .then(() => console.log("Database connection successful!"))
  .catch((err) => console.error("Database connection error:", err));
