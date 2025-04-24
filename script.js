function mincost(arr) {
  let totalCost = 0;

  while (arr.length > 1) {
    // Sort to get the two smallest ropes
    arr.sort((a, b) => a - b);
    
    // Remove the two smallest
    const first = arr.shift();
    const second = arr.shift();

    // Combine them and calculate cost
    const cost = first + second;
    totalCost += cost;

    // Push the combined rope back to the array
    arr.push(cost);
  }

  return totalCost;
}

function calculateMinCost() {
  const input = document.getElementById("ropeInput").value;
  const ropeArray = input.split(",").map(num => parseInt(num.trim())).filter(n => !isNaN(n));

  if (ropeArray.length < 1) {
    document.getElementById("result").innerText = "Please enter at least one rope length.";
    return;
  }

  const result = mincost(ropeArray);
  document.getElementById("result").innerText = `Minimum cost to connect ropes: ${result}`;
}
