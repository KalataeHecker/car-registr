const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', time: new Date() });
});

// Пример ендпойнт за търсене
app.get('/api/vehicles/:reg', (req, res) => {
  const reg = req.params.reg.toUpperCase();
  const dummy = {
    reg, marca: "BMW", model: "530d", year: "2018",
    owner: "Иван Петров Иванов", phone: "0888 123 456",
    email: "ivan.petrov@example.com", added: "24.05.2024 14:35"
  };
  if (reg === "CB1234AB") return res.json(dummy);
  res.status(404).json({ error: "Not found" });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
