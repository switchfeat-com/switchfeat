import { FlagModel, dateHelper } from "@switchfeat/core";
import { ConditionModel, StringOperator } from "@switchfeat/core";

export type EvaluateResponse = {
    match: boolean;
    meta: {
        segment: string | null;
        condition: string | null;
    }
    reason: string;
    time: number;
};

export const evaluateFlag = async (flag: FlagModel, context: { [key: string]: string }): Promise<EvaluateResponse> => {

    const response: EvaluateResponse = { match: false, meta: {} } as EvaluateResponse;
    const startTime = dateHelper.utcNow();
    try {

        if (!flag.rules) {
            response.match = flag.status;
            response.reason = "no_rules";
            return response;
        }

        const firstContextKey = Object.keys(context)[0];
        const contextValue = context[firstContextKey];

        if (!flag.status) {
            response.reason = "flag_inactive";
            return response;
        }

        let foundMatchCondition = false;
        flag.rules.map(x => {
            if (!foundMatchCondition) {
                const conditions = x.segment.conditions;
                const matchCondition = conditions?.filter(y => y.context === firstContextKey)[0];
                if (matchCondition) {
                    const hasMatch = getMatchByCondition(matchCondition, contextValue);
                    response.match = hasMatch;
                    response.meta.segment = x.segment.key;
                    response.meta.condition = matchCondition.key;
                    foundMatchCondition = true;
                }
            }
        });

        if (!foundMatchCondition) {
            response.reason = "no_matching_condition";
            return response;
        }

    } catch (ex) {
        response.reason = "generic_error";
    } finally {
        response.time = dateHelper.diffInMs(startTime, dateHelper.utcNow())!;
    }

    return response;
};


const getMatchByCondition = (condition: ConditionModel, contextValue: string): boolean => {
    switch (condition.conditionType) {
        case "string": {
            return stringConditionMatcher(condition, contextValue);
        }
    }

    return false;
};

const stringConditionMatcher = (condition: ConditionModel, contextValue: string): boolean => {
    switch (condition.operator as StringOperator) {
        case "equals": {
            return contextValue === condition.value;
        }
    }

    return false;
};