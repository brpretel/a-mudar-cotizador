const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Sirve todo lo estático desde /public
app.use(express.static(path.join(__dirname, "public")));

// Fallback al index (por si navegas rutas)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "form.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
