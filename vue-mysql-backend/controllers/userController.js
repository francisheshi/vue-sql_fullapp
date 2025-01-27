const express = require("express");
const bcrypt = require("bcryptjs");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const port = 5000;

// Set up MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "user_auth",
});

app.use(express.json());
app.use(cors());

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, result) => {
      if (err) return res.status(500).json({ error: "Database error" });

      if (result.length > 0)
        return res.status(400).json({ error: "Email already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);

      db.query(
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
        [username, email, hashedPassword],
        (err, result) => {
          if (err) return res.status(500).json({ error: "Database error" });

          const token = jwt.sign(
            { id: result.insertId, email },
            "your_jwt_secret",
            {
              expiresIn: "1h",
            }
          );

          return res
            .status(201)
            .json({ message: "User registered successfully", token });
        }
      );
    }
  );
};

const logUser = (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, result) => {
      if (err) return res.status(500).json({ error: "Database error" });

      if (result.length === 0)
        return res.status(400).json({ error: "User does not exist" });

      const user = result[0];

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch)
        return res.status(400).json({ error: "Invalid credentials" });

      const token = jwt.sign(
        { id: user.id, email: user.email },
        "your_jwt_secret",
        {
          expiresIn: "1h",
        }
      );

      return res.status(200).json({ message: "Signin successful", token });
    }
  );
};

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

module.exports = { registerUser, logUser };
