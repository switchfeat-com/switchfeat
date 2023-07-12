import { ConditionModel } from "../../../models/conditionModel";
import { NeDbManager } from "../dbManager";

let neDbManager: NeDbManager;

export const setNeDbManager = (neDbGlobalManager: NeDbManager) => {
    neDbManager = neDbGlobalManager;
};

export const getConditions = async (segmentId: string): Promise<ConditionModel[]> => neDbManager.conditions!.asyncFind({ "segmentId": segmentId });

export const getConditionById = async (id: string): Promise<ConditionModel> => neDbManager.conditions!.asyncFindOne({
    _id: id,
});

export const addCondition = async (condition: ConditionModel): Promise<boolean> => {
    try {
        const response = await neDbManager.conditions!.asyncInsert(condition);
        return (!!response);
    } catch (ex) {
        console.error(ex);
        return false;
    }
};

export const updateCondition = async (condition: ConditionModel): Promise<boolean> => {
    try {
        const response = await neDbManager.conditions!.asyncUpdate({ _id: condition._id }, {
            $set: {
                context: condition.context, 
                description: condition.description, 
                name: condition.name,
                updatedOn: condition.updatedOn,
                operator: condition.operator,
                value: condition.value,
                conditionType: condition.conditionType
            } as ConditionModel
        });
        return (!!response);
    } catch (ex) {
        console.error(ex);
        return false;
    }
};

export const deleteCondition = async (condition: ConditionModel): Promise<boolean> => {
    try {
        const response = await neDbManager.conditions!.asyncRemove({ _id: condition._id });
        return (!!response);
    } catch (ex) {
        console.error(ex);
        return false;
    }
};