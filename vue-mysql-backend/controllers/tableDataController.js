const db = require("../db/connection");

const getTableData = (req, res) => {
  const query = "SELECT * FROM tableData";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching table data:", err);
      return res.status(500).json({ error: "Failed to fetch table data" });
    }

    const tableData = {
      headers: ["NAME", "AGE", "EMAIL", "ADDRESS"],
      rows: results.map((row) => [row.name, row.age, row.email, row.address]),
    };

    res.status(200).json(tableData);
  });
};

module.exports = { getTableData };
