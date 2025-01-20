const getTableData = (req, res) => {
  const query = "SELECT * FROM tableData";

  db.query(query, (err, results, fields) => {
    if (err) {
      console.error("Error fetching table data:", err);
      return res.status(500).json({ error: "Failed to fetch table data" });
    }

    console.log("Results:", results);
    console.log("Fields:", fields);

    if (results.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }

    const headers = fields.map((field) => field.name);

    const rows = results.map((row) => fields.map((field) => row[field.name]));

    console.log("Mapped Table Data:", { headers, rows });

    const tableData = {
      headers,
      rows,
    };

    res.status(200).json(tableData);
  });
};

module.exports = { getTableData };
