const express = require('express');
const app = express();
app.use(express.json());

// Correct spelling
function mincost(arr) {
  let totalCost = 0;

  while (arr.length > 1) {
    arr.sort((a, b) => a - b);
    const first = arr.shift();
    const second = arr.shift();
    const cost = first + second;
    totalCost += cost;
    arr.push(cost);
  }

  return totalCost;
}

app.post('/mincost', (req, res) => {
  const { arr } = req.body;

  if (!Array.isArray(arr)) {
    return res.status(400).send({ error: 'Input must be an array' });
  }

  const result = mincost(arr); 
  res.send({ result });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
