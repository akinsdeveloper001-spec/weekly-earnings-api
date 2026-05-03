const express = require('express');
const app = express();

app.get('/get-week', (req, res) => {
  const date = new Date(req.query.date);

  const firstJan = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date - firstJan) / (24 * 60 * 60 * 1000));

  const week = Math.ceil((days + firstJan.getDay() + 1) / 7);

  res.json({
    week: week,
    year: date.getFullYear()
  });
});

app.listen(3000, () => console.log('Server running'));
