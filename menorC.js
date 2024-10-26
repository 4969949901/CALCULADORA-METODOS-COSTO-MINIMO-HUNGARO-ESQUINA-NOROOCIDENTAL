function crearTabla() {
    const filas = document.getElementById('filas').value;
    const columnas = document.getElementById('columnas').value;
    let tablaHTML = '<table><tr><th></th>';

    // Crear encabezados de las columnas (Destinos)
    for (let j = 1; j <= columnas; j++) {
        tablaHTML += `<th>Destino ${j}</th>`;
    }
    tablaHTML += '<th>Oferta</th></tr>';

    // Crear filas (Orígenes)
    for (let i = 1; i <= filas; i++) {
        tablaHTML += `<tr><th>Origen ${i}</th>`;
        for (let j = 1; j <= columnas; j++) {
            tablaHTML += `<td><input type="number" id="costo_${i}_${j}" min="0" value="0"></td>`;
        }
        tablaHTML += `<td><input type="number" id="oferta_${i}" min="0" value="0"></td></tr>`;
    }

    // Crear fila de demandas
    tablaHTML += '<tr><th>Demanda</th>';
    for (let j = 1; j <= columnas; j++) {
        tablaHTML += `<td><input type="number" id="demanda_${j}" min="0" value="0"></td>`;
    }
    tablaHTML += '</tr></table>';

    document.getElementById('tabla-seccion').innerHTML = tablaHTML;
    document.getElementById('resolver-btn').style.display = 'block';
}

function resolver() {
    const filas = document.getElementById('filas').value;
    const columnas = document.getElementById('columnas').value;

    // Leer costos, ofertas y demandas
    let costos = [];
    let oferta = [];
    let demanda = [];

    for (let i = 1; i <= filas; i++) {
        let fila = [];
        for (let j = 1; j <= columnas; j++) {
            const costo = parseInt(document.getElementById(`costo_${i}_${j}`).value) || 0;
            fila.push(costo);
        }
        costos.push(fila);
        const of = parseInt(document.getElementById(`oferta_${i}`).value) || 0;
        oferta.push(of);
    }

    for (let j = 1; j <= columnas; j++) {
        const dem = parseInt(document.getElementById(`demanda_${j}`).value) || 0;
        demanda.push(dem);
    }

    // Confirmar datos capturados
    console.log("Costos:", costos);
    console.log("Oferta:", oferta);
    console.log("Demanda:", demanda);

    let iteracionesHTML = '<h3>Iteraciones</h3>';
    iteracionesHTML += '<table><tr><th>Origen-Destino</th><th>Unidades Asignadas</th><th>Oferta Restante</th><th>Demanda Restante</th></tr>';

    // Aplicar método de menor costo
    let asignaciones = [];
    while (oferta.some(o => o > 0) && demanda.some(d => d > 0)) {
        let minCosto = Infinity;
        let minI = 0, minJ = 0;

        // Buscar la celda con el menor costo
        for (let i = 0; i < filas; i++) {
            for (let j = 0; j < columnas; j++) {
                if (oferta[i] > 0 && demanda[j] > 0 && costos[i][j] < minCosto) {
                    minCosto = costos[i][j];
                    minI = i;
                    minJ = j;
                }
            }
        }

        // Asignar lo máximo posible a la celda de menor costo
        let asignacion = Math.min(oferta[minI], demanda[minJ]);
        iteracionesHTML += `<tr><td>Origen ${minI + 1} - Destino ${minJ + 1}</td><td>${asignacion}</td><td>${oferta[minI] - asignacion}</td><td>${demanda[minJ] - asignacion}</td></tr>`;

        oferta[minI] -= asignacion;
        demanda[minJ] -= asignacion;

        asignaciones.push({ origen: minI + 1, destino: minJ + 1, unidades: asignacion });
    }

    iteracionesHTML += '</table>';
    document.getElementById('iteraciones').innerHTML = iteracionesHTML;
}
