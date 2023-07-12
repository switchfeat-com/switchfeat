import { BaseModel } from './baseModel';
import { ConditionModel } from './conditionModel';

export type Matching = "all" | "any";
 
export type SegmentModel = { 
    conditions?: ConditionModel[];
    matching: Matching;
} & BaseModel;