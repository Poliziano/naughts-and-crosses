import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { fromRoomItem, Room, toRoomItem } from "../entity/room";
import { User } from "../entity/user";
import { db } from "./dynamo";
import { createRoomConnection } from "./room-connection";
import KSUID = require("ksuid");

export async function createRoom(host: User): Promise<Room> {
  const room: Room = {
    id: KSUID.randomSync().string,
    host: host.id,
    opponent: null,
  };

  const command = new PutCommand({
    TableName: "OXGame",
    Item: toRoomItem(room),
  });

  await db.send(command);
  await createRoomConnection(room.id, host.id);

  return room;
}

export async function getRoom(id: Room["id"]): Promise<Room | null> {
  const command = new GetCommand({
    TableName: "OXGame",
    Key: {
      PK: `ROOM#${id}`,
      SK: `ROOM#${id}`,
    },
  });

  const response = await db.send(command);
  return response.Item ? fromRoomItem(response.Item) : null;
}
