import { DateTime } from 'luxon';

export interface ConditionModel {
    name: string;
    description?: string;
    createdOn: DateTime;
    updatedOn: DateTime;
    status: boolean;
}