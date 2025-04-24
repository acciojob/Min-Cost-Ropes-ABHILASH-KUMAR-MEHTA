class MinHeap {
    constructor() {
        this.heap = [];
    }

    insert(val) {
        this.heap.push(val);
        this._bubbleUp(this.heap.length - 1);
    }

    extractMin() {
        if (this.heap.length === 1) return this.heap.pop();
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this._bubbleDown(0);
        return min;
    }

    size() {
        return this.heap.length;
    }

    _bubbleUp(index) {
        const element = this.heap[index];
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            const parent = this.heap[parentIndex];
            if (element >= parent) break;
            this.heap[index] = parent;
            index = parentIndex;
        }
        this.heap[index] = element;
    }

    _bubbleDown(index) {
        const length = this.heap.length;
        const element = this.heap[index];
        while (true) {
            let left = 2 * index + 1;
            let right = 2 * index + 2;
            let smallest = index;

            if (left < length && this.heap[left] < this.heap[smallest]) {
                smallest = left;
            }
            if (right < length && this.heap[right] < this.heap[smallest]) {
                smallest = right;
            }
            if (smallest === index) break;

            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            index = smallest;
        }
    }
}

function mincost(arr) {
    if (arr.length <= 1) return 0;

    const heap = new MinHeap();
    arr.forEach(num => heap.insert(num));

    let totalCost = 0;

    while (heap.size() > 1) {
        const first = heap.extractMin();
        const second = heap.extractMin();
        const cost = first + second;
        totalCost += cost;
        heap.insert(cost);
    }

    return totalCost;
}

function calculateMinCost() {
    const input = document.getElementById("ropeInput").value;
    const ropeArray = input.split(",").map(num => parseInt(num.trim())).filter(n => !isNaN(n));

    if (ropeArray.length === 0) {
        document.getElementById("result").innerText = "Please enter valid rope lengths.";
        return;
    }

    const result = mincost(ropeArray);
    document.getElementById("result").innerText = `Minimum cost: ${result}`;
}
