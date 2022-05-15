import { NativeAttributeValue } from "@aws-sdk/util-dynamodb";

export type Room = {
  id: string;
  host: string;
  opponent: string | null;
};

export function toRoomItem(room: Room) {
  return {
    PK: `ROOM#${room.id}`,
    SK: `ROOM#${room.id}`,
    host: room.host,
    opponent: room.opponent ?? null,
  };
}

export function fromRoomItem(item: {
  [index: string]: NativeAttributeValue;
}): Room {
  return {
    id: item.PK.split("#")[1],
    host: item.host,
    opponent: item.opponent,
  };
}
