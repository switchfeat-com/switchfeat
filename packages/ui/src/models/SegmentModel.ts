
export type SegmentModel = {
    name: string;
    description?: string;
    createdOn: string;
    updatedOn: string;
    key: string;
    matching: string;
    conditions: ConditionModel[];
};

export type ConditionModel = {
    key: string;
    operator: string;
    value: string | undefined;
    context: string;
    conditionType: string;
};