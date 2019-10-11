import * as dynamoDBLib from './libs/dynamodb-lib';
import { success, failure} from './libs/response-lib';

export async function main(event, context){

    const params = {
        TableName: process.env.tableName,
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: {
            ":userId": event.requestContext.identity.cognitoIdentityId
        }
    };

    try {
        const allNotes = await dynamoDBLib.call("query", params);
        return success(allNotes.Items);
    } catch (e) {
        return failure({status: false});
    }
}