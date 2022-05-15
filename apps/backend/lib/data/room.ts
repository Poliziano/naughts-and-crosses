import {
  BatchWriteCommand,
  GetCommand,
  TransactWriteCommand,
} from "@aws-sdk/lib-dynamodb";
import KSUID = require("ksuid");
import { fromRoomItem, Room, toRoomItem } from "../entity/room";
import {
  RoomConnection,
  toRoomConnectionItem,
} from "../entity/room-connection";
import { User } from "../entity/user";
import { db } from "./dynamo";

export async function createRoom(host: User): Promise<Room> {
  const room: Room = {
    id: KSUID.randomSync().string,
    host: host.id,
    opponent: null,
  };

  const connection: RoomConnection = {
    roomId: room.id,
    userId: host.id,
  };

  const command = new BatchWriteCommand({
    RequestItems: {
      OXGame: [
        {
          PutRequest: {
            Item: toRoomItem(room),
          },
        },
        {
          PutRequest: {
            Item: toRoomConnectionItem(connection),
          },
        },
      ],
    },
  });

  await db.send(command);
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
