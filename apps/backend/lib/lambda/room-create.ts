import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { createRoom } from "../data/room";
import { getUser } from "../data/user";

export async function handler(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  const userId = event.pathParameters?.userId;
  if (typeof userId !== "string") {
    return {
      statusCode: 400,
      body: "",
    };
  }

  const user = await getUser(userId);
  if (user == null) {
    return {
      statusCode: 400,
      body: "",
    };
  }

  const room = await createRoom({ id: userId });
  return {
    statusCode: 200,
    body: JSON.stringify({
      roomId: room.id,
    }),
  };
}
