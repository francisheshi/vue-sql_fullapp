const db = require("../db/connection");

const getProducts = (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) {
      console.error("Error fetching products:", err);
      return res.status(500).json({ error: "Failed to fetch products" });
    }
    res.status(200).json(results);
  });
};

const addProduct = (req, res) => {
  const { name, description, quantity } = req.body;

  if (!name || !description || typeof quantity !== "number") {
    return res.status(400).json({ error: "Invalid product data" });
  }

  const query =
    "INSERT INTO products (name, description, quantity) VALUES (?, ?, ?)";
  db.query(query, [name, description, quantity], (err, results) => {
    if (err) {
      console.error("Error adding product:", err);
      return res.status(500).json({ error: "Failed to add product" });
    }
    const newProduct = { id: results.insertId, name, description, quantity };
    res.status(201).json(newProduct);
  });
};

const updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, description, quantity } = req.body;

  if (!name || !description || typeof quantity !== "number") {
    return res.status(400).json({ error: "Invalid product data" });
  }

  const query =
    "UPDATE products SET name = ?, description = ?, quantity = ? WHERE id = ?";
  db.query(query, [name, description, quantity, id], (err, results) => {
    if (err) {
      console.error("Error updating product:", err);
      return res.status(500).json({ error: "Failed to update product" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    db.query("SELECT * FROM products WHERE id = ?", [id], (err, results) => {
      if (err) {
        console.error("Error fetching updated product:", err);
        return res
          .status(500)
          .json({ error: "Failed to fetch updated product" });
      }
      res.status(200).json(results[0]);
    });
  });
};

module.exports = { getProducts, addProduct, updateProduct };
