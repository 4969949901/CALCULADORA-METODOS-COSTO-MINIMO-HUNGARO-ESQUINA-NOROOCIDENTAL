document.getElementById("inputForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const supplyInput = document.getElementById("supply").value;
    const demandInput = document.getElementById("demand").value;

    const supply = supplyInput.split(',').map(Number);
    const demand = demandInput.split(',').map(Number);
    
    const result = calculateNorthwestCorner(supply, demand);
    
    document.getElementById("result").innerText = result;
});

function calculateNorthwestCorner(supply, demand) {
    let allocation = [];
    for (let i = 0; i < supply.length; i++) {
        allocation[i] = [];
        for (let j = 0; j < demand.length; j++) {
            allocation[i][j] = 0;
        }
    }

    let i = 0, j = 0;
    while (i < supply.length && j < demand.length) {
        let allocated = Math.min(supply[i], demand[j]);
        allocation[i][j] = allocated;
        supply[i] -= allocated;
        demand[j] -= allocated;

        if (supply[i] === 0) i++;
        if (demand[j] === 0) j++;
    }

    return allocation.map(row => row.join(', ')).join('\n');
}
