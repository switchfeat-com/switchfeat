import { BaseModel } from './baseModel';

export type ConditionType = "string" | "number" | "boolean" | "datetime";
export type BaseOperator = "equals" | "notEquals";
export type BooleanOperator = "true" | "false";
export type StringOperator = ("startsWith" | "endsWith") & BaseOperator;
export type NumericOperator = ("gt" | "lt" | "gte"| "lte") & BaseOperator;
export type DayTimeOperator = ("before" | "after" | "beforeOrAt"| "afterOrAt") & BaseOperator;

export type ConditionModel = {
    context: string;
    operator: StringOperator | NumericOperator | DayTimeOperator | BooleanOperator;
    conditionType: ConditionType;
    value: string;
    segmentKey: string;
} & BaseModel;