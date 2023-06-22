import { DateTime } from 'luxon';
import { ConditionModel } from './conditionModel';

export interface FlagModel {
    name: string;
    description?: string;
    createdOn: DateTime;
    updatedOn: DateTime;
    status: boolean;
    condition: ConditionModel;
}