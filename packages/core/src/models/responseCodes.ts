
export type ResponseCode = {
    message: string;
    statusCode: number;
    description?: string;
};

type ResponseCodes = {
    GenericError: ResponseCode,
    ConditionNotFound: ResponseCode,
    SegmentNotFound: ResponseCode,
    RuleNotFound: ResponseCode,
    FlagNotFound: ResponseCode,
    NoMatchingCondition: ResponseCode,
    ApiKeyNotValid: ResponseCode,
    ApiKeyNotFound: ResponseCode,
    ApiKeyExpired: ResponseCode,
    FlagDisabled: ResponseCode,
    FlagMatch: ResponseCode,
    InputMissing: ResponseCode
};

export const SdkResponseCodes: ResponseCodes = {

    // errors
    GenericError: { message: "generic_error", statusCode: 500 },

    ConditionNotFound: { message: "condition_not_found", statusCode: 404 },
    FlagNotFound: { message: "flag_not_found", statusCode: 404 },
    SegmentNotFound: { message: "segment_not_found", statusCode: 404 },
    RuleNotFound: { message: "rule_not_found", statusCode: 404 },

    NoMatchingCondition: { message: "no_matching_condition", statusCode: 400 },
    InputMissing: { message: "input_missing", statusCode: 400 },

    ApiKeyNotValid: { message: "api_key_not_valid", statusCode: 401 },
    ApiKeyExpired: { message: "api_key_expired", statusCode: 401 },
    ApiKeyNotFound: { message: "api_key_not_found", statusCode: 401, description: "Add the 'sf-api-key' header with your api key to the request" },

    // info
    FlagDisabled: { message: "flag_disabled", statusCode: 200 },
    FlagMatch: { message: "flag_match", statusCode: 200 },
} as const;