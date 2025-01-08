import { Time } from '@internationalized/date';

interface TimeFilterModel {
    fromDate: Date;
    fromTime: Time;
    toDate: Date;
    toTime: Time;
    from: Date;
    to: Date;
}

const now = new Date();
const fromDateDefaultValue = new Date(now.setDate(now.getDate() - 30));
const toDateDefaultValue = new Date();

// Get user's timezone offset in minutes
const userTimezoneOffset = new Date().getTimezoneOffset();

const timeFilterModel: TimeFilterModel = {
    fromDate: fromDateDefaultValue,
    fromTime: { hour: 0, minute: 0 } as Time,
    toDate: toDateDefaultValue,
    toTime: { hour: 23, minute: 59 } as Time,
    get from() {
        const from = this.fromDate;
        const localFrom = new Date(from.getTime() - userTimezoneOffset * 60000);
        return new Date(localFrom.getFullYear(), localFrom.getMonth(), localFrom.getDate(), this.fromTime.hour, this.fromTime.minute);
    },
    get to() {
        const to = this.toDate;
        const localTo = new Date(to.getTime() - userTimezoneOffset * 60000);
        return new Date(localTo.getFullYear(), localTo.getMonth(), localTo.getDate(), this.toTime.hour, this.toTime.minute);
    }
};

export default timeFilterModel;
