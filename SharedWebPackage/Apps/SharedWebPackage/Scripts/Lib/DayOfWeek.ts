
export class DayOfWeek {
    static readonly Sunday = new DayOfWeek(0, 'Sunday');
    static readonly Monday = new DayOfWeek(1, 'Monday');
    static readonly Tuesday = new DayOfWeek(2, 'Tuesday');
    static readonly Wednesday = new DayOfWeek(3, 'Wednesday');
    static readonly Thursday = new DayOfWeek(4, 'Thursday');
    static readonly Friday = new DayOfWeek(5, 'Friday');
    static readonly Saturday = new DayOfWeek(6, 'Saturday');

    static fromValue(value: number) {
        if (value < 0) {
            value = -value;
        }
        if (value > 6) {
            value = value % 7;
        }
        if (value == 0) {
            return DayOfWeek.Sunday;
        }
        if (value == 1) {
            return DayOfWeek.Monday;
        }
        if (value == 2) {
            return DayOfWeek.Tuesday;
        }
        if (value == 3) {
            return DayOfWeek.Wednesday;
        }
        if (value == 4) {
            return DayOfWeek.Thursday;
        }
        if (value == 5) {
            return DayOfWeek.Friday;
        }
        return DayOfWeek.Saturday;
    }

    private constructor(readonly value: number, readonly displayText: string) {
    }

    equals(other: number | DayOfWeek) {
        if (typeof other === 'number') {
            return this.value === other;
        }
        return this.value == other.value;
    }

    compareTo(other: number | DayOfWeek) {
        const otherValue = typeof other === 'number' ? other : other.value;
        if (this.value > otherValue) {
            return 1;
        }
        if (this.value < otherValue) {
            return -1;
        }
        return 0;
    }

    toString() {
        return this.displayText.toString();
    }
}