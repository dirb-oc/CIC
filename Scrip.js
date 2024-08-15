document.addEventListener('DOMContentLoaded', function() {

    function adjustFooterPosition() {
        const footer = document.getElementById('Footer');
        const bodyHeight = document.body.clientHeight;
        const windowHeight = window.innerHeight;

        if (bodyHeight < windowHeight) {
            footer.style.position = 'absolute';
            footer.style.bottom = '0';
        } else {
            footer.style.position = 'relative';
        }
    }

    adjustFooterPosition();
    window.addEventListener('resize', adjustFooterPosition);

    const CantidadInicial = document.getElementById('Cantidad');
    const Tiempo = document.getElementById('Tiempo');
    const Tasa = document.getElementById('Tasa');
    const Abonos = document.getElementById('Abono');

    const Total = document.getElementById('Informacion');
    const Ganancia = document.getElementById('Ganancia');
    const Porcentaje = document.getElementById('Porcentaje');
    const Acumulado = document.getElementById('Acumulado');

    Total.textContent = '$0';
    Ganancia.textContent = '$0';
    Acumulado.textContent = '$0';
    Porcentaje.textContent = '0%';

    let Datos = [];

    function actualizarTotal() {
        let cantidad = parseFloat(CantidadInicial.value);
        let tiempo = parseFloat(Tiempo.value);
        let tasa = parseFloat(Tasa.value);
        let abonos = parseFloat(Abonos.value);
        
        const Contenedor = document.getElementById('Contenedor');
        const Calculadora = document.getElementById('Calculadora');

        if ((!isNaN(cantidad) || !isNaN(abonos)) && !isNaN(tiempo) && !isNaN(tasa)) {
            
            Contenedor.style.display = 'grid';
            Calculadora.style.height = '100%';

            if (isNaN(cantidad)) cantidad = 0;
            if (isNaN(abonos)) abonos = 0;

            let resultado = cantidad;

            Datos = [];
            for (let i = 0; i < tiempo; i++) {
                resultado += (resultado * (tasa / 100));

                let Interes = 0;
                if (resultado > 0) {
                    Interes = resultado * (tasa / 100); // Cálculo de interés para el periodo
                }

                resultado += abonos;

                Datos.push({
                    Tiempo: (i + 1),
                    Aporte: abonos * (i + 1), // Abono acumulado hasta el periodo i
                    Interes: parseFloat(Interes.toFixed(2)), // Interés acumulado para el periodo i
                    AporteT: abonos * (i + 1) + abonos, // Aporte total sumado en cada periodo
                    Total: parseFloat(resultado.toFixed(2)) 
                });
                
            }

            const Incremento = Math.round(resultado - cantidad);
            const Porciento = Math.round((Incremento * 100) / resultado);
            const acu = (tiempo * abonos) + cantidad;
            const valor = resultado.toLocaleString('es-ES');
            const Valor2 = Incremento.toLocaleString('es-ES');
            const Cantidad_Total = acu.toLocaleString('es-ES');

            Total.textContent = `$${valor}`;
            Ganancia.textContent = `$${Valor2}`;
            Acumulado.textContent = `$${Cantidad_Total}`;
            Porcentaje.textContent = `${Porciento}%`;
        } else {
            Total.textContent = '$0';
            Ganancia.textContent = '$0';
            Porcentaje.textContent = '0%';
            Acumulado.textContent = `$0`;
        }
    }

    CantidadInicial.addEventListener('input', actualizarTotal);
    Tiempo.addEventListener('input', actualizarTotal);
    Tasa.addEventListener('input', actualizarTotal);
    Abonos.addEventListener('input', actualizarTotal);

    const Tabla = document.getElementById('Tabla');

    Tabla.addEventListener('click', function() {
        const datosTabla = [];
    
        for (let i = 0; i < Datos.length; i++) {
            
            datosTabla.push(Datos[i]);
        }
        
        localStorage.setItem('DatosTabla', JSON.stringify(datosTabla));
        window.location.href = 'Table/Tabla.html';
    });

});