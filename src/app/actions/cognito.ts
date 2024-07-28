"use server";

import {
  CognitoIdentityProviderClient,
  AdminCreateUserCommand,
  AdminUpdateUserAttributesCommand,
  AdminSetUserPasswordCommand, // Added import for MessageActionType
  AdminGetUserCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { generateRandomPassword, returnAwsCredentials } from "src/utils";

const region = process.env.AWS_REGION || "us-east-2";
const userPoolId = process.env.COGNITO_USER_POOL_ID || "test_user_pool_id";

const cognitoClient = new CognitoIdentityProviderClient({
  region,
  credentials: returnAwsCredentials(),
});

export default async function createNewCognitorUser(
  email: string,
  changePassword: string
) {
  const temporaryPassword = generateRandomPassword();

  let userExists = false;
  try {
    await cognitoClient.send(
      new AdminGetUserCommand({
        UserPoolId: userPoolId,
        Username: email,
      })
    );

    userExists = true;

    console.log("User already exists");
  } catch (err) {
    if (err.name !== "UserNotFoundException") {
      throw err; // Rethrow if the error is not 'UserNotFoundException'
    }
  }
  try {
    // If user does not exist, create a new Cognito user
    if (!userExists) {
      console.log("Creating a new Cognito user");
      const createUserParams = {
        UserPoolId: userPoolId,
        Username: email,
        UserAttributes: [
          { Name: "email", Value: email },
          { Name: "email_verified", Value: "true" },
        ],
        TemporaryPassword: temporaryPassword,
      };
      await cognitoClient.send(new AdminCreateUserCommand(createUserParams));

      if ((userExists && changePassword === "true") || !userExists) {
        console.log("Will set the password or change password")
        // Set the permanent password
        const setPasswordParams = {
          UserPoolId: userPoolId,
          Username: email,
          Password: temporaryPassword,
          Permanent: true, // Make the password permanent
        };
        await cognitoClient.send(
          new AdminSetUserPasswordCommand(setPasswordParams)
        );
      }

      // Set an expiration date for the user (90 days from now)
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 90);
      const updateUserAttributesParams = {
        UserPoolId: userPoolId,
        Username: email,
        UserAttributes: [
          {
            Name: "custom:expirationDate",
            Value: expirationDate.toISOString(),
          },
        ],
      };
      await cognitoClient.send(
        new AdminUpdateUserAttributesCommand(updateUserAttributesParams)
      );
    }
  } catch (err) {
    throw err;
  }
}
