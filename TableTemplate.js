'use strict';

class TableTemplate {
    static fillIn(id, dict, columnName) {
        const table = document.getElementById(id);
        if (!table) {
            console.warn(`Table with id '${id}' not found`);
            return;  // Explicitly return undefined for consistency
        }

        const templateRegex = /{{\s*([\w]+)\s*}}/g;

        const replaceTemplate = str => str.replace(templateRegex,
            (_, propName) => dict[propName] || `{{${propName}}}`);

        const headerRow = table.rows[0];
        const fillCell = cell => {
            cell.textContent = replaceTemplate(cell.textContent);
        };

        // Replace templates in header
        [...headerRow.cells].forEach(fillCell);

        let colIndex = -1;
        if (columnName) {
            colIndex = [...headerRow.cells].findIndex(cell => cell.textContent === columnName);
            if (colIndex === -1) {
                console.warn(`Column '${columnName}' not found`);
                return;
            }
        }

        // Fill each row with replaced template
        [...table.rows].slice(1).forEach(row => {
            if (columnName) {
                fillCell(row.cells[colIndex]);
            } else {
                [...row.cells].forEach(fillCell);
            }
        });

        table.style.visibility = 'visible';
    }
}
