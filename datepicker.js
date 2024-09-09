class DatePicker {
    constructor(id, callback) {
        this.container = document.getElementById(id);
        this.callback = callback;
        this.currentDate = new Date();
        this.render(this.currentDate);
    }

    render(date) {
        this.currentDate = new Date(date.getFullYear(), date.getMonth(), 1);
        const daysInMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0).getDate();
        const firstDayOfWeek = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1).getDay();

        // Generate the header with month and year, and navigation controls
        let calendarHTML = `
            <div class="datepicker-header">
                <span class="datepicker-prev" onclick="${this.getCallback(-1)}">&lt;</span>
                <span class="datepicker-month-year">${this.getMonthName(this.currentDate.getMonth())} ${this.currentDate.getFullYear()}</span>
                <span class="datepicker-next" onclick="${this.getCallback(1)}">&gt;</span>
            </div>
            <table class="datepicker-table">
                <thead>
                    <tr>
                        <th>Su</th>
                        <th>Mo</th>
                        <th>Tu</th>
                        <th>We</th>
                        <th>Th</th>
                        <th>Fr</th>
                        <th>Sa</th>
                    </tr>
                </thead>
                <tbody>`;

        let dayCounter = 1 - firstDayOfWeek;

        // Generate the rows for each week
        for (let week = 0; week < 6; week++) {
            calendarHTML += "<tr>";
            for (let day = 0; day < 7; day++) {
                if (dayCounter > 0 && dayCounter <= daysInMonth) {
                    calendarHTML += `<td class="datepicker-day" onclick="${this.getSelectCallback(dayCounter)}">${dayCounter}</td>`;
                } else {
                    // For days not in the current month
                    const otherMonthDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), dayCounter);
                    calendarHTML += `<td class="datepicker-other-month">${otherMonthDate.getDate()}</td>`;
                }
                dayCounter++;
            }
            calendarHTML += "</tr>";
        }

        calendarHTML += `
                </tbody>
            </table>`;

        // Update the container's innerHTML
        this.container.innerHTML = calendarHTML;
    }

    getCallback(monthOffset) {
        return `document.getElementById('${this.container.id}')._instance.render(new Date(${this.currentDate.getFullYear()}, ${this.currentDate.getMonth()} + ${monthOffset}, 1));`;
    }

    getSelectCallback(day) {
        return `document.getElementById('${this.container.id}')._instance.selectDate(${day});`;
    }

    getMonthName(monthIndex) {
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return monthNames[monthIndex];
    }

    selectDate(day) {
        const selectedDate = {
            month: this.currentDate.getMonth() + 1,
            day: day,
            year: this.currentDate.getFullYear()
        };
        this.callback(this.container.id, selectedDate);
    }
}

// Attach the DatePicker instance to the element for access in callbacks
document.querySelectorAll('div').forEach(div => {
    div._instance = new DatePicker(div.id, (id, date) => {
        console.log(`Date selected in ${id}: ${date.month}/${date.day}/${date.year}`);
    });
});

const datePicker = new DatePicker("div1", function (id, fixedDate) {
    console.log("DatePicker with id", id,
        "selected date:", fixedDate.month + "/" + fixedDate.day + "/" + fixedDate.year);
});
datePicker.render(new Date("July 4, 1776"));