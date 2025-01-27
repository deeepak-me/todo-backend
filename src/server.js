import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Get the file path from the URL of the current module
const __filename = fileURLToPath(import.meta.url);

// Get the directory name from the file path
const __dirname = dirname(__filename);

//Middlewares
app.use(express.json());

// serve the HTML file from the /public directory
// Tells express to serve all files from the public folder as static assets /file. any request for the css files will be resolved to the public directory.

app.use(express.static(path.join(__dirname, "../public")));

// serving up the HTML file from the  /public directory
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

//Routes
app.use("/auth", authRoutes);
app.use("/todos", todoRoutes);

app.listen(PORT, () => {
  console.log(`server has started on port: ${PORT}`);
});
