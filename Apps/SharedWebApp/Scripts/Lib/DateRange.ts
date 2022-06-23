import { FormattedDate } from "./FormattedDate";

export class DateRange {
    constructor(readonly startDate: Date, readonly endDate: Date) {
    }

    format() {
        let str: string;
        if (this.startDate || this.endDate) {
            const startDate = new FormattedDate(this.startDate).formatDate();
            const endDate = new FormattedDate(this.endDate).formatDate();
            if (this.startDate && !this.endDate) {
                str = `On or After ${startDate}`;
            }
            else if (this.endDate && !this.startDate) {
                str = `On or Before ${endDate}`;
            }
            else if (this.startDate.getTime() == this.startDate.getTime()) {
                str = `On ${startDate}`;
            }
            else {
                str = `${startDate} to ${endDate}`;
            }
        }
        else {
            str = '';
        }
        return str;
    }

    toString() {
        return this.format();
    }
}