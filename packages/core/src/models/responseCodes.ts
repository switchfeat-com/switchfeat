
export type ResponseCode = {
    message: string;
    statusCode: number;
};

type ResponseCodes = {
    GenericError: ResponseCode,
    ConditionNotFound: ResponseCode,
    SegmentNotFound: ResponseCode,
    FlagNotFound: ResponseCode,
    NoMatchingCondition: ResponseCode,
    ApiKeyNotValid: ResponseCode,
    RuleNotFound: ResponseCode,
    FlagDisabled: ResponseCode,
    FlagMatch: ResponseCode,
};

export const SdkResponseCodes: ResponseCodes = {

    // errors
    GenericError: { message: "generic_error", statusCode: 500 },
    ConditionNotFound: { message: "condition_not_found", statusCode: 404 },
    FlagNotFound: { message: "flag_not_found", statusCode: 404 },
    NoMatchingCondition: { message: "no_matching_condition", statusCode: 400 },
    SegmentNotFound: { message: "segment_not_found", statusCode: 404 },
    ApiKeyNotValid: { message: "apikey_not_valid", statusCode: 401 },
    RuleNotFound:  { message: "rule_not_found", statusCode: 404 },

    // info
    FlagDisabled:  { message: "flag_disabled", statusCode: 200 },
    FlagMatch:  { message: "flag_match", statusCode: 200 },
} as const;