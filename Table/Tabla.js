document.addEventListener('DOMContentLoaded', function() {
    const datosTabla = JSON.parse(localStorage.getItem('DatosTabla'));
    const tableBody = document.getElementById('tbody');

    if (datosTabla && datosTabla.length > 0) {
        tableBody.innerHTML = ''; // Limpiar el contenido existente antes de agregar nuevas filas

        for (let i = 0; i < datosTabla.length; i++) {
            let row = `
                <tr>
                    <td>${datosTabla[i].Tiempo}</td>
                    <td>${datosTabla[i].Aporte}</td>
                    <td>${datosTabla[i].Interes}</td>
                    <td>${datosTabla[i].AporteT}</td>
                    <td>${datosTabla[i].Total}</td>
                </tr>
            `;
            tableBody.innerHTML += row;
        }
    }
});