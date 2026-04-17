
export class Month {
    static readonly January = new Month(0);
    static readonly February = new Month(1);
    static readonly March = new Month(2);
    static readonly April = new Month(3);
    static readonly May = new Month(4);
    static readonly June = new Month(5);
    static readonly July = new Month(6);
    static readonly August = new Month(7);
    static readonly September = new Month(8);
    static readonly October = new Month(9);
    static readonly November = new Month(10);
    static readonly December = new Month(11);
    static readonly Months = [
        Month.January,
        Month.February,
        Month.March,
        Month.April,
        Month.May,
        Month.June,
        Month.July,
        Month.August,
        Month.September,
        Month.October,
        Month.November,
        Month.December
    ];
    
    static fromIndex(index: number) {
        if (index === null || index === undefined) {
            index = 0;
        }
        if (index >= 0 && index < 12) {
            return Month.Months[index];
        }
        return new Month(index);
    }

    static fromValue(value: number) {
        return Month.fromIndex(value - 1);
    }
    
    readonly value: number;
    readonly index: number;

    private constructor(index: number) {
        this.index = index;
        this.value = index + 1;
    }

    add(months: number) {
        return Month.fromIndex(this.index + months);
    }

    toJSON() { return this.index; }

    formatShortName() {
        return new Date(2023, this.index, 1).toLocaleTimeString([], { month: 'short' });
    }

    formatLongName() {
        return new Date(2023, this.index, 1).toLocaleTimeString([], { month: 'long' });
    }

    equals(other: Month) {
        if (other) {
            if (this === other) {
                return true;
            }
            return this.normalizeIndex() === other.normalizeIndex();
        }
        return false;
    }

    compareTo(other: Month) {
        if (other) {
            if (this.normalizeIndex() > other.normalizeIndex()) {
                return 1;
            }
            if (this.normalizeIndex() < other.normalizeIndex()) {
                return -1;
            }
            return 0;
        }
        return -1;
    }

    normalizeIndex() {
        let index = this.index;
        index = index % 12;
        if (index < 0) {
            index -= 12;
        }
        return index;
    }
}