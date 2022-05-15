import { NativeAttributeValue } from "@aws-sdk/util-dynamodb";

export type RoomConnection = {
  roomId: string;
  userId: string;
};

export function toRoomConnectionItem(connection: RoomConnection) {
  return {
    PK: `USER#${connection.userId}`,
    SK: `ROOM#${connection.roomId}`,
  };
}

export function fromRoomConnectionItem(item: {
  [index: string]: NativeAttributeValue;
}): RoomConnection {
  return {
    userId: item.PK.split("#")[1],
    roomId: item.SK.split("#")[1],
  };
}
