document.getElementById('jubilacionForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Captura los datos del formulario
    const nombre = document.getElementById('nombre').value;
    const cui = document.getElementById('cui').value;
    const nit = document.getElementById('nit').value;
    const entidad = document.getElementById('entidad').value;
    const direccion = document.getElementById('direccion').value;
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;
    const aniosLaborados = parseInt(document.getElementById('aniosLaborados').value);
    const sueldo1 = parseFloat(document.getElementById('sueldo1').value);
    const sueldo2 = parseFloat(document.getElementById('sueldo2').value);
    const sueldo3 = parseFloat(document.getElementById('sueldo3').value);
    const sueldo4 = parseFloat(document.getElementById('sueldo4').value);
    const sueldo5 = parseFloat(document.getElementById('sueldo5').value);

    // Cálculo de edad
    const today = new Date();
    const birthDate = new Date(fechaNacimiento);
    const age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    const edad = m < 0 || (m === 0 && today.getDate() < birthDate.getDate()) ? age - 1 : age;

    // Validaciones de edad y años laborados
    if ((edad >= 50 && aniosLaborados >= 10) || aniosLaborados >= 20) {
        const sueldos = [sueldo1, sueldo2, sueldo3, sueldo4, sueldo5];
        const sueldoPromedio = sueldos.reduce((a, b) => a + b) / sueldos.length;
        const porcentajeJubilacion = obtenerPorcentajeJubilacion(aniosLaborados);
        const jubilacionBase = sueldoPromedio * (porcentajeJubilacion / 100);
        
        // Cálculo de los bonos y ajustes
        const adicionDto8195 = 448;
        const incrementoDto3797 = ((sueldoPromedio * (porcentajeJubilacion / 100)) + 448) * 0.10;
        const bono90797 = 69;
        const bono95498 = 106;
        const bonoMarzo2000 = 100;
        const bonoMayo2000 = 100;
        const bonoAgosto2001 = 50;
        const bonoJulio2008 = 120;

        // Sumatoria de todos los bonos y ajustes
        const totalBonos = adicionDto8195 + incrementoDto3797 + bono90797 + bono95498 +
            bonoMarzo2000 + bonoMayo2000 + bonoAgosto2001 + bonoJulio2008;
        let jubilacionTotal = jubilacionBase + totalBonos;

        // Redondeo la jubilación total
        jubilacionTotal = Math.round(jubilacionTotal);

        // Verificar el límite de jubilación
        if (jubilacionTotal > 5370) {
            jubilacionTotal = 5370;
        }

        // Guardar los resultados en localStorage
        localStorage.setItem('resultado', JSON.stringify({
            valido: true,
            nombre: nombre,
            cui: cui,
            nit: nit,
            entidad: entidad,
            direccion: direccion,
            edad: edad,
            aniosLaborados: aniosLaborados,
            sueldoPromedio: sueldoPromedio,
            porcentajeJubilacion: porcentajeJubilacion,
            adicionDto8195: adicionDto8195,
            incrementoDto3797: incrementoDto3797,
            bono90797: bono90797,
            bono95498: bono95498,
            bonoMarzo2000: bonoMarzo2000,
            bonoMayo2000: bonoMayo2000,
            bonoAgosto2001: bonoAgosto2001,
            bonoJulio2008: bonoJulio2008,
            totalBonos: totalBonos,
            jubilacionTotal: jubilacionTotal
        }));
    } else {
        localStorage.setItem('resultado', JSON.stringify({
            valido: false
        }));
    }

    // Redireccionar a resultado.html
    window.location.href = 'resultado.html';
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

document.getElementById('fechaNacimiento').addEventListener('input', function() {
    const birthDate = new Date(this.value);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    document.getElementById('edad').value = age;
});
