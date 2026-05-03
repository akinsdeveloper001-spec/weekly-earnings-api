const express = require('express');
const app = express();

app.get('/get-week', (req, res) => {
  const inputDate = req.query.date;
  const date = new Date(inputDate);

  if (isNaN(date)) {
    return res.json({ error: "Invalid date format" });
  }

  // ISO Week calculation (Monday start)
  const tempDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));

  // Set to nearest Thursday (ISO rule)
  tempDate.setUTCDate(tempDate.getUTCDate() + 4 - (tempDate.getUTCDay() || 7));

  const yearStart = new Date(Date.UTC(tempDate.getUTCFullYear(), 0, 1));

  const week = Math.ceil((((tempDate - yearStart) / 86400000) + 1) / 7);

  const year = tempDate.getUTCFullYear();

  res.json({
    week: week,
    year: year
  });
});

app.listen(3000, () => console.log('Server running'));
