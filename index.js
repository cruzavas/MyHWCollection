function createRow(auto) {
    const tr = document.createElement("tr");

    tr.innerHTML = `
                <td>${auto.codigo}</td>
                <td>${auto.numero}</td>
                <td>${auto.modelo}</td>
                <td>
                    <span class="collection-tag ${auto.coleccion.tipo}">${auto.coleccion.nombre}</span>
                    ${auto.coleccion.nuevo ? '<span class="new-badge">NEW</span>' : ''}
                </td>
                <td>${auto.serie}</td>
                <td class="image-cell">
                    <a href="${auto.imagen}" target="_blank">
                        <img src="${auto.imagen}" alt="${auto.modelo}">
                    </a>
                </td>
            `;
    return tr;
}

function fillDataTable(year = 2023) {
    fetch(year + '_data.json')
        .then(response => {
            if (!response.ok) throw new Error('Could not load the JSON file');
            return response.json();
        })
        .then(autos => {
            const table = document.getElementById("tbody_" + year);
            autos.forEach(auto => {
                const fila = createRow(auto);
                table.appendChild(fila);
            });

            new DataTable('#table_' + year, {
                layout: {
                    bottomEnd: {
                        paging: {
                            firstLast: false
                        }
                    }
                },
                language: {
                    url: 'https://cdn.datatables.net/plug-ins/2.3.2/i18n/es-ES.json',
                },
            });
        })
        .catch(error => {
            console.error('Error loading the JSON file:', error);
        });
}

new DataTable('#table_top_3', {
    layout: {
        bottomEnd: {
            paging: {
                firstLast: false
            }
        }
    },
    language: {
        url: 'https://cdn.datatables.net/plug-ins/2.3.2/i18n/es-ES.json',
    },
    info: false,
    ordering: false,
    paging: false,
    searching: false,
});
fillDataTable(2023);
fillDataTable(2024);
fillDataTable(2025);