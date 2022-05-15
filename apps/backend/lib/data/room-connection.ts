import { PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { Room } from "../entity/room";
import {
  fromRoomConnectionItem,
  RoomConnection,
  toRoomConnectionItem,
} from "../entity/room-connection";
import { User } from "../entity/user";
import { db } from "./dynamo";

export async function createRoomConnection(
  roomId: Room["id"],
  userId: User["id"]
) {
  const connection: RoomConnection = {
    roomId,
    userId,
  };

  const command = new PutCommand({
    TableName: "OXGame",
    Item: toRoomConnectionItem(connection),
  });

  await db.send(command);
}

export async function getRoomConnections(
  userId: User["id"]
): Promise<RoomConnection[]> {
  const command = new QueryCommand({
    TableName: "OXGame",
    KeyConditionExpression: "PK = :pk and begins_with(SK, :sk)",
    ExpressionAttributeValues: {
      ":pk": `USER#${userId}`,
      ":sk": `ROOM#`,
    },
  });

  const response = await db.send(command);
  const items = response.Items ?? [];

  return items.map(fromRoomConnectionItem);
}
