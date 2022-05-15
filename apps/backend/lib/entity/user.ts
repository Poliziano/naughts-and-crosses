import { NativeAttributeValue } from "@aws-sdk/util-dynamodb";

export type User = {
  id: string;
};

export function toUserItem(user: User) {
  return {
    PK: `USER#${user.id}`,
    SK: `USER#${user.id}`,
  };
}

export function fromUserItem(item: {
  [index: string]: NativeAttributeValue;
}): User {
  return {
    id: item.PK.split("#")[1],
  };
}
