import { DateTime } from "luxon";

export interface FlagModel {
    name: string;
    description?: string;
    createdOn: DateTime;
    updatedOn: DateTime;
    status: boolean;
}