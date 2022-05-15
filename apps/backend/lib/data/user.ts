import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import KSUID = require("ksuid");
import { fromUserItem, toUserItem, User } from "../entity/user";
import { db } from "./dynamo";

export async function createUser(): Promise<User> {
  const user: User = {
    id: KSUID.randomSync().string,
  };

  const command = new PutCommand({
    TableName: "OXGame",
    Item: toUserItem(user),
  });
  await db.send(command);

  return user;
}

export async function getUser(id: User["id"]): Promise<User | null> {
  const command = new GetCommand({
    TableName: "OXGame",
    Key: {
      PK: `USER#${id}`,
      SK: `USER#${id}`,
    },
  });

  const response = await db.send(command);
  return response.Item ? fromUserItem(response.Item) : null;
}
