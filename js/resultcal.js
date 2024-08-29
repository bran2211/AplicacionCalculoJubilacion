document.addEventListener('DOMContentLoaded', function() {
    const resultadoDiv = document.getElementById('resultado');
    const resultado = JSON.parse(localStorage.getItem('resultado'));

    if (resultado && resultado.valido) {
        const { 
            nombre, cui, nit, entidad, direccion, edad, aniosLaborados, 
            sueldoPromedio, jubilacionTotal 
        } = resultado;

        // Cálculo de los bonos y ajustes
        const porcentajeJubilacion = obtenerPorcentajeJubilacion(aniosLaborados);
        const bonoAdicion = 448;
        const incrementoDto3797 = (sueldoPromedio * (porcentajeJubilacion / 100) + bonoAdicion) * 0.10;
        const bono90797 = 69;
        const bono95498 = 106;
        const bonoMarzo2000 = 100;
        const bonoMayo2000 = 100;
        const bonoAgosto2001 = 50;
        const bonoJulio2008 = 120;

        // Calcular el porcentaje conforme a la escala
        const porcentajeConformeEscala = sueldoPromedio * (porcentajeJubilacion / 100);

        // Sumatoria de todos los bonos y ajustes
        const totalBonos = bonoAdicion + incrementoDto3797 + bono90797 + bono95498 +
            bonoMarzo2000 + bonoMayo2000 + bonoAgosto2001 + bonoJulio2008;

        // Total final incluyendo sueldo promedio * tasa y bonos
        const totalConSueldoPromedio = totalBonos + porcentajeConformeEscala;

        // Imprimir los resultados
        resultadoDiv.innerHTML = `
            <div class="resultado-cuadro">
                <h2>Datos de Jubilación</h2>
                <p><strong>Nombre:</strong> ${nombre}</p>
                <p><strong>CUI:</strong> ${cui}</p>
                <p><strong>NIT:</strong> ${nit}</p>
                <p><strong>Entidad:</strong> ${entidad}</p>
                <p><strong>Dirección:</strong> ${direccion}</p>
                <p><strong>Edad:</strong> ${edad} años</p>
                <p><strong>Años Laborados:</strong> ${aniosLaborados} años</p>
                <p><strong>Sueldo Promedio:</strong> Q${sueldoPromedio.toFixed(2)}</p>
                <p><strong>Total Jubilación:</strong> Q${jubilacionTotal.toFixed(2)}</p>
                <br><br>
                <h2>Detalles del Cálculo</h2>
                <table class="resultado-tabla">
                    <thead>
                        <tr>
                            <th>Descripción</th>
                            <th>Cálculo</th>
                            <th>Resultado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Promedio Sueldo</td>
                            <td>(Sueldo 1 + Sueldo 2 + Sueldo 3 + Sueldo 4 + Sueldo 5) / 5</td>
                            <td>Q${sueldoPromedio.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Porcentaje Conforme Escala</td>
                            <td>Sueldo Promedio * Tasa de porcentaje que Corresponde</td>
                            <td>Q${porcentajeConformeEscala.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Adición Dto 81-95</td>
                            <td>448</td>
                            <td>Q${bonoAdicion}</td>
                        </tr>
                        <tr>
                            <td>10% de Incremento Decreto 37-97</td>
                            <td>(Sueldo Promedio * Tasa de Porcentaje / 100) + 448 * 0.10</td>
                            <td>Q${incrementoDto3797.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Bono Acuerdo 907-97</td>
                            <td>69</td>
                            <td>Q${bono90797}</td>
                        </tr>
                        <tr>
                            <td>Bono Acuerdo 954-98</td>
                            <td>106</td>
                            <td>Q${bono95498}</td>
                        </tr>
                        <tr>
                            <td>Bono Marzo 2000</td>
                            <td>100</td>
                            <td>Q${bonoMarzo2000}</td>
                        </tr>
                        <tr>
                            <td>Bono Mayo 2000</td>
                            <td>100</td>
                            <td>Q${bonoMayo2000}</td>
                        </tr>
                        <tr>
                            <td>Bono Agosto 2001</td>
                            <td>50</td>
                            <td>Q${bonoAgosto2001}</td>
                        </tr>
                        <tr>
                            <td>Bono Julio 2008</td>
                            <td>120</td>
                            <td>Q${bonoJulio2008}</td>
                        </tr>
                        <tr>
                            <td>Total Sumatoria</td>
                            <td>Sumatoria de todos los bonos y ajustes + Sueldo Promedio * Tasa</td>
                            <td>Q${totalConSueldoPromedio.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Total Jubilacion a recibir</td>
                            <td></td>
                            <td>Q${jubilacionTotal.toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
                <br>
                <div class="boton-container">
                    <a href="formulario.html" class="nuevo-boton">Nuevo formulario</a> <!-- Botón de nuevo -->
                </div>
            </div>
        `;
    } else {
        resultadoDiv.innerHTML = `<p>No cumple con los requisitos para optar por la jubilación.</p>`;
    }

    // Limpiar el localStorage
    localStorage.removeItem('resultado');
});

function obtenerPorcentajeJubilacion(aniosLaborados) {
    const tablaPorcentajes = {
        10: 36.90, 11: 39.40, 12: 41.90, 13: 44.40, 14: 46.90, 15: 49.40,
        16: 52.20, 17: 55.00, 18: 57.80, 19: 60.60, 20: 63.40, 21: 66.70,
        22: 70.00, 23: 73.30, 24: 76.60, 25: 79.90, 26: 83.20, 27: 87.40,
        28: 91.60, 29: 95.80, 30: 100
    };
    return tablaPorcentajes[aniosLaborados] || 0;
}
