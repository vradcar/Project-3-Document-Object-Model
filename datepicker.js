'use strict';

class DatePicker {
    constructor(id, callback) {
        this.id = id;
        this.callback = callback;
        this.currentDate = new Date();
        this.element = document.getElementById(this.id);
        this.render(this.currentDate);
    }

    render(date) {
        this.currentDate = new Date(date.getFullYear(), date.getMonth(), 1);
        this.element.innerHTML = '';

        const calendarContainer = this.createElement('div', 'calendar-container');
        const header = this.createHeader();
        const daysRow = this.createDaysRow();
        const daysGrid = this.createDaysGrid();

        calendarContainer.append(header, daysRow, daysGrid);
        this.element.appendChild(calendarContainer);
    }

    createHeader() {
        const header = this.createElement('div', 'calendar-header');
        const monthYearDisplay = this.createElement('span', 'month-year-display',
            `${this.currentDate.toLocaleString('default', { month: 'long' })} ${this.currentDate.getFullYear()}`);

        const prevButton = this.createButton('&lt;', () => this.changeMonth(-1));
        const nextButton = this.createButton('&gt;', () => this.changeMonth(1));

        header.append(prevButton, monthYearDisplay, nextButton);
        return header;
    }

    createDaysRow() {
        const daysRow = this.createElement('div', 'calendar-days-row');
        ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].forEach(day => {
            daysRow.appendChild(this.createElement('span', 'calendar-day-name', day));
        });
        return daysRow;
    }

    createDaysGrid() {
        const daysGrid = this.createElement('div', 'calendar-days-grid');
        const firstDay = this.currentDate.getDay();
        const lastDate = this.getLastDateOfMonth(this.currentDate);
        const lastDatePrevMonth = this.getLastDateOfMonth(new Date(this.currentDate.getFullYear(),
            this.currentDate.getMonth() - 1));

        // Previous month days
        for (let i = firstDay - 1; i >= 0; i--) {
            daysGrid.appendChild(this.createElement('span', 'calendar-day dimmed', lastDatePrevMonth - i));
        }

        // Current month days
        for (let day = 1; day <= lastDate; day++) {
            const dayElement = this.createElement('span', 'calendar-day', day);
            if (this.isToday(day)) dayElement.classList.add('today');
            dayElement.onclick = () => this.selectDate(day);
            daysGrid.appendChild(dayElement);
        }

        // Next month days
        const remainingDays = (7 - (daysGrid.children.length % 7)) % 7;
        for (let i = 1; i <= remainingDays; i++) {
            daysGrid.appendChild(this.createElement('span', 'calendar-day dimmed', i));
        }

        return daysGrid;
    }

    changeMonth(offset) {
        const newDate = new Date(this.currentDate.getFullYear(),
            this.currentDate.getMonth() + offset, 1);
        this.render(newDate);
    }

    selectDate(day) {
        const selectedDate = new Date(this.currentDate.getFullYear(),
            this.currentDate.getMonth(), day);
        this.callback(this.id, {
            month: selectedDate.getMonth() + 1,
            day: selectedDate.getDate(),
            year: selectedDate.getFullYear()
        });
    }

    isToday(day) {
        const today = new Date();
        return today.getFullYear() === this.currentDate.getFullYear() &&
            today.getMonth() === this.currentDate.getMonth() &&
            today.getDate() === day;
    }

    // eslint-disable-next-line class-methods-use-this
    getLastDateOfMonth(date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    }

    // eslint-disable-next-line class-methods-use-this
    createElement(tag, className = '', innerText = '') {
        const element = document.createElement(tag);
        element.className = className;
        element.innerText = innerText;
        return element;
    }

    createButton(innerHTML, onClick) {
        const button = this.createElement('button');
        button.innerHTML = innerHTML;
        button.onclick = onClick;
        return button;
    }
}
