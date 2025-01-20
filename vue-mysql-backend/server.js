const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
