import {
    ApiResponseCode,
    FlagModel,
    ApiResponseCodes,
    dateHelper,
} from "@switchfeat/core";
import { ConditionModel, StringOperator } from "@switchfeat/core";
import { v4 as uuidv4 } from "uuid";

export type EvaluateResponse = {
    match: boolean;
    meta: {
        segment: string | null;
        condition: string | null;
    };
    reason: ApiResponseCode;
    time: number;
    correlationId: string;
    responseId: string;
};

export const evaluateFlag = async (
    flag: FlagModel,
    context: Record<string, string>,
    correlationId: string,
): Promise<EvaluateResponse> => {
    const response: EvaluateResponse = {
        match: false,
        meta: {},
    } as EvaluateResponse;
    const startTime = dateHelper.utcNow();
    try {
        if (!flag.rules) {
            response.match = flag.status;
            response.reason = ApiResponseCodes.RuleNotFound;
            return response;
        }

        const firstContextKey = Object.keys(context)[0];
        const contextValue = context[firstContextKey];

        if (!flag.status) {
            response.reason = ApiResponseCodes.FlagDisabled;
            return response;
        }

        let foundMatchCondition = false;
        flag.rules.map((x) => {
            if (!foundMatchCondition) {
                const conditions = x.segment.conditions;
                const matchCondition = conditions?.filter(
                    (y) => y.context === firstContextKey,
                )[0];
                if (matchCondition) {
                    const hasMatch = getMatchByCondition(
                        matchCondition,
                        contextValue,
                    );
                    response.match = hasMatch;
                    response.meta.segment = x.segment.key;
                    response.meta.condition = matchCondition.key;
                    foundMatchCondition = true;
                    response.reason = ApiResponseCodes.FlagMatch;
                }
            }
        });

        if (!foundMatchCondition) {
            response.reason = ApiResponseCodes.NoMatchingCondition;
            return response;
        }
    } catch (ex) {
        response.reason = ApiResponseCodes.GenericError;
    } finally {
        response.time = dateHelper.diffInMs(startTime, dateHelper.utcNow())!;
        response.responseId = uuidv4();
        response.correlationId = correlationId;
    }

    return response;
};

const getMatchByCondition = (
    condition: ConditionModel,
    contextValue: string,
): boolean => {
    switch (condition.conditionType) {
        case "string": {
            return stringConditionMatcher(condition, contextValue);
        }
        case "datetime": {
            return datetimeConditionMatcher(condition, contextValue);
        }
    }

    return false;
};

const stringConditionMatcher = (
    condition: ConditionModel,
    contextValue: string,
): boolean => {
    switch (condition.operator as StringOperator) {
        case "equals": {
            return contextValue === condition.value;
        }
    }

    return false;
};

// New condition matcher for datetime conditions
const datetimeConditionMatcher = (
    condition: ConditionModel,
    contextValue: string, // Assuming contextValue is a string representing a datetime
): boolean => {
    // Convert context and condition values to Date objects
    const contextDate = new Date(contextValue);
    const conditionDate = new Date(condition.value);

    // Evaluate the datetime condition
    switch (condition.operator) {
        case "before": {
            return contextDate < conditionDate;
        }
        case "after": {
            return contextDate > conditionDate;
        }
        case "beforeOrAt": {
            return contextDate <= conditionDate;
        }
        case "afterOrAt": {
            return contextDate >= conditionDate;
        }
        case "equals": {
            return contextDate.getTime() === conditionDate.getTime();
        }
        case "notEquals": {
            return contextDate.getTime() !== conditionDate.getTime();
        }
        default: {
            return false; 
        }
    }
};

//Final commit