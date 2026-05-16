const express = require('express');
const app = express();

app.get('/get-week', (req, res) => {
  const inputDate = req.query.date;
  const date = new Date(inputDate);

  if (isNaN(date)) {
    return res.json({ error: "Invalid date format" });
  }

  // ISO week calculation: Monday to Sunday
  const tempDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  tempDate.setUTCDate(tempDate.getUTCDate() + 4 - (tempDate.getUTCDay() || 7));

  const yearStart = new Date(Date.UTC(tempDate.getUTCFullYear(), 0, 1));
  const week = Math.ceil((((tempDate - yearStart) / 86400000) + 1) / 7);
  const year = tempDate.getUTCFullYear();

  res.json({
    week: week,
    year: year
  });
});

app.get('/airport-price', (req, res) => {
  const distance = parseFloat(req.query.distance);

  if (isNaN(distance)) {
    return res.json({ error: "Invalid distance" });
  }

  let price;

  if (distance <= 32) {
    price = 60;
  } else {
    price = 60 + ((distance - 32) * 1.5);
  }

  res.json({
    distance: distance,
    price: Number(price.toFixed(2))
  });
});

app.get('/mask-name', (req, res) => {
  const fullName = req.query.fullName;

  if (!fullName) {
    return res.json({ error: "Full name is required" });
  }

  const parts = fullName.trim().split(/\s+/);
  const firstName = parts[0];

  let displayName = firstName;

  if (parts.length > 1) {
    const lastName = parts[parts.length - 1];
    const lastInitial = lastName.charAt(0).toUpperCase();
    displayName = `${firstName} ${lastInitial}.`;
  }

  res.json({
    displayName: displayName
  });
});

app.get('/', (req, res) => {
  res.send('Weekly Earnings API is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
