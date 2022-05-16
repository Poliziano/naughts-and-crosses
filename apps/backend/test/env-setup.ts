import {
  BatchWriteCommand,
  PutCommand,
  TransactWriteCommand,
} from "@aws-sdk/lib-dynamodb";
import { jest } from "@jest/globals";
import { db } from "../lib/data/dynamo";

type PrimaryKey = {
  PK: string;
  SK: string;
};

const clientSpy = jest.spyOn(db, "send");

afterEach(async () => {
  await deleteDynamoDBItems(clientSpy.mock.calls.map((call) => call[0]));
});

async function deleteDynamoDBItems(commands: any[]) {
  const keys: PrimaryKey[] = [];

  for (const command of commands) {
    keys.push(
      ...extractPutCommandKey(command),
      ...extractTransactionCommandKeys(command),
      ...extractBatchWriteCommandKeys(command)
    );
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

function extractPutCommandKey(command: PutCommand): PrimaryKey[] {
  if (command?.input?.Item == null) {
    return [];
  }
  return [
    {
      PK: command.input.Item.PK,
      SK: command.input.Item.SK,
    },
  ];
}

function extractTransactionCommandKeys(
  command: TransactWriteCommand
): PrimaryKey[] {
  const keys: PrimaryKey[] = [];
  for (const item of command?.input?.TransactItems ?? []) {
    if (item.Put?.Item) {
      keys.push({
        PK: item.Put.Item.PK,
        SK: item.Put.Item.SK,
      });
    }
  }
  return keys;
}

function extractBatchWriteCommandKeys(
  command: BatchWriteCommand
): PrimaryKey[] {
  const keys: PrimaryKey[] = [];
  for (const item of command?.input?.RequestItems?.OXGame ?? []) {
    if (item.PutRequest?.Item) {
      keys.push({
        PK: item.PutRequest.Item.PK,
        SK: item.PutRequest.Item.SK,
      });
    }
  }
  return keys;
}
