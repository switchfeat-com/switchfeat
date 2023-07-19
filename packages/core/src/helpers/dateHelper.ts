import { DateTime } from "luxon";

// ref: https://www.thisdot.co/blog/how-to-handle-time-zones-using-datetime-and-luxon

export const utcNow = () : DateTime => {

    return DateTime.utc();
};

export const utcToTimezone = (isoUtc: string, timezone: string): DateTime => {

    const utcInput =  DateTime.fromISO(isoUtc, { zone: "utc"});
    const converted = utcInput.setZone(timezone);

    return converted;
};

export const timezoneToUtc = (isoUtc: string, timezone: string): DateTime => {

    const utcInput =  DateTime.fromISO(isoUtc, { zone: timezone});
    const converted = utcInput.toUTC();

    return converted;
};

export function toDateTime(createdAt: string) : DateTime {
    return DateTime.fromISO(createdAt);
}

export const diffFromUtcInDays = (date: string | undefined) => {

    if (date === undefined) {
        return;
    }

    return DateTime.fromISO(date).diff( DateTime.utc(), ["days"]).toObject().days?.toFixed(0);
};

export const diffInMs = (startDate: DateTime, endDate: DateTime): number => {
    return endDate.toMillis() - startDate.toMillis();
};