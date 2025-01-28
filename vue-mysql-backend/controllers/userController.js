const { db2, db1 } = require("../db/connection");

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  db2.query(
    "SELECT * FROM users WHERE username = ? & email = ? & password = ?",
    [email],
    async (err, result) => {
      if (err) return res.status(500).json({ error: "Database error" });

      if (result.length > 0)
        return res.status(400).json({ error: "Email already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);

      db2.query(
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
        [username, email, hashedPassword],
        (err, result) => {
          if (err) return res.status(500).json({ error: "Database error" });

          const token = jwt.sign(
            { id: result.insertId, username, email, password },
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

const logUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials!" });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      success: true,
      token,
      message: "Signin successful!",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { registerUser, logUser };
