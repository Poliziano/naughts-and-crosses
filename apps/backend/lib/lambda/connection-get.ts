import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { getRoomConnections } from "../data/room-connection";

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

  const connections = await getRoomConnections(userId);

  return {
    statusCode: 200,
    body: JSON.stringify({
      rooms: connections.map((connection) => connection.roomId),
    }),
  };
}
