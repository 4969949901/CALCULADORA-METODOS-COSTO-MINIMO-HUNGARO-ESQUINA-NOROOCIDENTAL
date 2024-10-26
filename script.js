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
            fila.push(parseInt(document.getElementById(`costo_${i}_${j}`).value));
        }
        costos.push(fila);
        oferta.push(parseInt(document.getElementById(`oferta_${i}`).value));
    }
    
    for (let j = 1; j <= columnas; j++) {
        demanda.push(parseInt(document.getElementById(`demanda_${j}`).value));
    }

    // Aplicar método de la esquina noroccidental
    let i = 0, j = 0;
    let iteracionesHTML = '<h3>Iteraciones</h3>';
    iteracionesHTML += '<table><tr><th>Origen-Destino</th><th>Unidades Asignadas</th><th>Oferta Restante</th><th>Demanda Restante</th></tr>';
    
    while (i < filas && j < columnas) {
        let asignacion = Math.min(oferta[i], demanda[j]);
        
        iteracionesHTML += `<tr><td>Origen ${i + 1} - Destino ${j + 1}</td><td>${asignacion}</td><td>${oferta[i] - asignacion}</td><td>${demanda[j] - asignacion}</td></tr>`;
        
        oferta[i] -= asignacion;
        demanda[j] -= asignacion;
        
        if (oferta[i] === 0) i++;
        if (demanda[j] === 0) j++;
    }
    
    iteracionesHTML += '</table>';
    document.getElementById('iteraciones').innerHTML = iteracionesHTML;
}
