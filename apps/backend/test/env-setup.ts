import { db } from "../lib/data/dynamo";
import { jest } from "@jest/globals";
import {
  BatchWriteCommand,
  DeleteCommand,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";

type OXGamePrimaryKey = {
  PK: string;
  SK: string;
};

const clientSpy = jest.spyOn(db, "send");

afterEach(async () => {
  await deleteDynamoDBItems(clientSpy.mock.calls.map((call) => call[0]));
});

async function deleteDynamoDBItems(commands: any[]) {
  const keys: OXGamePrimaryKey[] = [];

  for (const command of commands) {
    const key = extractPutCommandKey(command);

    if (key) {
      keys.push(key);
    }
  }

  const command = new BatchWriteCommand({
    RequestItems: {
      OXGame: keys.map((key) => ({
        DeleteRequest: {
          Key: key,
        },
      })),
    },
  });

  if (keys.length > 0) {
    await db.send(command);
  }
}

function extractPutCommandKey(command: any): OXGamePrimaryKey | null {
  if (command?.input?.Item == null) {
    return null;
  }
  return {
    PK: command.input.Item.PK,
    SK: command.input.Item.SK,
  };
}
