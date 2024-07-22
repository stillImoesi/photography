"use server";

import {
  DynamoDBClient,
  PutItemCommand,
  QueryCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { returnAwsCredentials } from "src/utils";

const region = process.env.AWS_REGION || "eu-central-1";
const databaseName = process.env.DATABASE_NAME || "test_table";

const dynamoDbClient = new DynamoDBClient({
  region,
  credentials: returnAwsCredentials(),
});

interface DBArgs {
  email: string;
  title: string;
  maxAllowedPictures: number;
  createdAt?: string;
}

export default async function createOrUpdateDbEntry(formData: DBArgs) {
  try {
    // Check if the album exists in DynamoDB
    const queryParams = {
      TableName: databaseName,
      KeyConditionExpression: "email = :email and title = :title",
      ExpressionAttributeValues: {
        ":email": { S: formData.email },
        ":title": { S: formData.title },
      },
    };

    const queryResult = await dynamoDbClient.send(
      new QueryCommand(queryParams)
    );

    if (queryResult?.Items?.length) {
      console.log("Updating existing album");
      // Update existing album
      const updateParams = {
        TableName: databaseName,
        Key: {
          email: { S: formData.email },
          title: { S: formData.title },
        },
        UpdateExpression:
          "set max_selected_pics = :max_selected_pics, updated_at = :updated_at",
        ExpressionAttributeValues: {
          ":max_selected_pics": { N: formData.maxAllowedPictures.toString() },
          ":updated_at": { S: new Date().toISOString() },
        },
      };
      await dynamoDbClient.send(new UpdateItemCommand(updateParams));
    } else {
      console.log("Creating new album");
      // 2. Save album data in DynamoDB
      const albumParams = {
        TableName: databaseName,
        Item: {
          email: { S: formData.email },
          title: { S: formData.title },
          max_selected_pics: { N: formData.maxAllowedPictures.toString() },
          created_at: { S: formData.createdAt || new Date().toISOString() },
          updated_at: { S: new Date().toISOString() },
          selected_pictures: { L: [] },
        },
      };
      await dynamoDbClient.send(new PutItemCommand(albumParams));
    }
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error("Failed to complete the operation");
  }
}
