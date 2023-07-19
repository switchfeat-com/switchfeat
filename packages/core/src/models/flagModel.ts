import { BaseModel } from './baseModel';
import { RuleModel } from './ruleModel';

export type FlagModel = {
    key: string; 
    status: boolean;
    rules?: RuleModel[];
} & BaseModel;