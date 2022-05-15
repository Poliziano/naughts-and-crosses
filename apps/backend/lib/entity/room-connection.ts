import { NativeAttributeValue } from "@aws-sdk/util-dynamodb";

export type RoomConnection = {
  roomId: string;
  userId: string;
};

export function toRoomConnectionItem(connection: RoomConnection) {
  return {
    PK: `ROOM#${connection.roomId}`,
    SK: `USER#${connection.userId}`,
  };
}

export function fromRoomConnectionItem(item: {
  [index: string]: NativeAttributeValue;
}): RoomConnection {
  return {
    roomId: item.PK.split("#")[1],
    userId: item.SK.split("#")[1],
  };
}
