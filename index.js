const express = require('express');
const app = express();

app.get('/get-week', (req, res) => {
  const inputDate = req.query.date;

  // Force proper date parsing
  const date = new Date(inputDate);

  if (isNaN(date)) {
    return res.json({
      error: "Invalid date format"
    });
  }

  // Get correct year
  const year = date.getFullYear();

  // Calculate week (ISO-like)
  const firstJan = new Date(year, 0, 1);
  const days = Math.floor((date - firstJan) / (24 * 60 * 60 * 1000));
  const week = Math.ceil((days + firstJan.getDay() + 1) / 7);

  res.json({
    week: week,
    year: year
  });
});

app.listen(3000, () => console.log('Server running'));
