import { CreateTableCommand } from "@aws-sdk/client-dynamodb";
import { GenericContainer, StartedTestContainer } from "testcontainers";
import { db } from "../lib/data/dynamo";

let startedContainer: StartedTestContainer;

export default async function () {
  if (startedContainer) {
    return;
  }

  startedContainer = await new GenericContainer("amazon/dynamodb-local")
    .withExposedPorts({
      host: 8000,
      container: 8000,
    })
    .start();

  await createDynamoTable();
}

export async function createDynamoTable() {
  const command = new CreateTableCommand({
    TableName: "OXGame",
    KeySchema: [
      {
        KeyType: "HASH",
        AttributeName: "PK",
      },
      {
        KeyType: "RANGE",
        AttributeName: "SK",
      },
    ],
    AttributeDefinitions: [
      {
        AttributeType: "S",
        AttributeName: "PK",
      },
      {
        AttributeType: "S",
        AttributeName: "SK",
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
  });

  await db.send(command);
}
