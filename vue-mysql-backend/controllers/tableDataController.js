const db = require("../db/connection"); // ✅ Ensure this is imported!

const getTableData = (req, res) => {
  db.query("SELECT * from tableData", (err, results) => {
    if (err) {
      console.error("Error fetching table data:", err);
      return res.status(500).json({ error: "Failed to fetch table data" });
    }
    res.status(200).json(results);
  });
};

module.exports = { getTableData };
