class TableTemplate {
    static fillIn(tableId, dict, columnName = null) {
        const table = document.getElementById(tableId);
        if (!table) {
            console.error(`Table with id "${tableId}" not found.`);
            return;
        }

        const headers = table.querySelectorAll('th');
        let columnIndex = -1;

        // Replace templates in headers
        headers.forEach((header, index) => {
            const originalHeader = header.innerHTML;
            header.innerHTML = TableTemplate.processTemplate(originalHeader, dict);
            if (TableTemplate.cleanString(header.innerHTML) === TableTemplate.cleanString(columnName)) {
                columnIndex = index;
            }
        });

        // Replace templates in the specified column or the entire table
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            cells.forEach((cell, index) => {
                if (columnName === null || index === columnIndex) {
                    const originalCell = cell.innerHTML;
                    cell.innerHTML = TableTemplate.processTemplate(originalCell, dict);
                }
            });
        });

        // Make table visible if it was hidden
        if (table.style.visibility === 'hidden') {
            table.style.visibility = 'visible';
        }
    }

    // Helper method to process template strings
    static processTemplate(template, dict) {
        return template.replace(/{{(.*?)}}/g, (match, p1) => {
            const key = p1.trim();
            return dict[key] !== undefined ? dict[key] : match;
        });
    }

    // Helper method to clean and compare strings (ignoring whitespace)
    static cleanString(str) {
        return str.replace(/\s+/g, '').toLowerCase();
    }
}
