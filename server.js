const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.use(express.json());

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

const db = new sqlite3.Database("database.db");

db.run(`
CREATE TABLE IF NOT EXISTS cars (
id INTEGER PRIMARY KEY AUTOINCREMENT,
plate TEXT,
brand TEXT,
model TEXT,
year TEXT,
owner TEXT,
ownerInfo TEXT,
image TEXT
)`);

app.post("/add-car", upload.single("image"), (req, res) => {
  const { plate, brand, model, year, owner, ownerInfo } = req.body;
  const image = req.file ? req.file.filename : "";

  db.run(
    "INSERT INTO cars (plate, brand, model, year, owner, ownerInfo, image) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [plate, brand, model, year, owner, ownerInfo, image]
  );

  res.sendStatus(200);
});

app.get("/search", (req, res) => {
  db.all(
    "SELECT * FROM cars WHERE plate = ?",
    [req.query.plate],
    (err, rows) => res.json(rows)
  );
});

app.listen(PORT, () => console.log("http://localhost:" + PORT));
