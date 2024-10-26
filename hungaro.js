function crearTabla() {
    const filas = parseInt(document.getElementById('filas').value);
    const columnas = parseInt(document.getElementById('columnas').value);

    // Validación de entradas
    if (isNaN(filas) || isNaN(columnas) || filas <= 0 || columnas <= 0) {
        alert('Por favor, ingresa un número válido de filas y columnas.');
        return;
    }

    let tablaHTML = '<table><tr><th></th>';

    // Crear encabezados de las columnas
    for (let j = 1; j <= columnas; j++) {
        tablaHTML += `<th>Columna ${j}</th>`;
    }
    tablaHTML += '</tr>';

    // Crear filas
    for (let i = 1; i <= filas; i++) {
        tablaHTML += `<tr><th>Fila ${i}</th>`;
        for (let j = 1; j <= columnas; j++) {
            tablaHTML += `<td><input type="number" id="costo_${i}_${j}" min="0" value="0"></td>`;
        }
        tablaHTML += '</tr>';
    }

    document.getElementById('tabla-seccion').innerHTML = tablaHTML;
    document.getElementById('resolver-btn').style.display = 'block';
}

function resolver() {
    const filas = parseInt(document.getElementById('filas').value);
    const columnas = parseInt(document.getElementById('columnas').value);

    let costos = [];
    for (let i = 1; i <= filas; i++) {
        let fila = [];
        for (let j = 1; j <= columnas; j++) {
            const valor = parseInt(document.getElementById(`costo_${i}_${j}`).value);
            fila.push(isNaN(valor) ? 0 : valor); // Validar y asignar 0 si no es un número
        }
        costos.push(fila);
    }

    let procedimientosHTML = '<h3>Procedimientos</h3>';
    
    // Paso 1: Restar el valor mínimo de cada fila
    for (let i = 0; i < filas; i++) {
        let minFila = Math.min(...costos[i]);
        for (let j = 0; j < columnas; j++) {
            costos[i][j] -= minFila;
        }
    }
    procedimientosHTML += `<p>Restar el valor mínimo de cada fila: ${JSON.stringify(costos)}</p>`;

    // Paso 2: Restar el valor mínimo de cada columna
    for (let j = 0; j < columnas; j++) {
        let minColumna = Math.min(...costos.map(fila => fila[j]));
        for (let i = 0; i < filas; i++) {
            costos[i][j] -= minColumna;
        }
    }
    procedimientosHTML += `<p>Restar el valor mínimo de cada columna: ${JSON.stringify(costos)}</p>`;

    // Paso 3: Asignación de tareas utilizando los ceros
    procedimientosHTML += '<p>Asignación de tareas utilizando los ceros (por filas):</p>';
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            if (costos[i][j] === 0) {
                procedimientosHTML += `<p>Tarea ${i+1} asignada al Trabajador ${j+1}</p>`;
                break;
            }
        }
    }

    document.getElementById('procedimientos').innerHTML = procedimientosHTML;
}
