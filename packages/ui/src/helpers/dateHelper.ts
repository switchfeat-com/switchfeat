import { DateTime } from "luxon";

export const formatDateTime = (dateStr: string | undefined) => {

    if (dateStr === undefined) {
        return "";
    }

    return DateTime.fromISO(dateStr).toFormat("MMM dd, yyyy @ hh:mm a");
};

export const utcNow = (): DateTime => {
    return DateTime.utc();
}

export const getDateWithOffset = (nrDays: number, start: DateTime): DateTime => {
    return start.minus({ "days": nrDays });
}

export const diffFromUtcInDays = (date: string | undefined) => {

    if (date === undefined) {
        return;
    }

    return DateTime.fromISO(date).diff(DateTime.utc(), ["days"]).toObject().days?.toFixed(0);
};