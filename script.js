const express = require('express');
const app = express();
app.use(express.json());

// Correct spelling
function mincost(arr) {
  let totalCost = 0;

  while (arr.length > 1) {
    arr.sort((a, b) => a - b);  // Sort the array
    const first = arr.shift();   // Remove the smallest rope
    const second = arr.shift();  // Remove the next smallest rope
    const cost = first + second; // Calculate the merge cost
    totalCost += cost;           // Add the cost to the total
    arr.push(cost);              // Add the new merged rope back to the array
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
