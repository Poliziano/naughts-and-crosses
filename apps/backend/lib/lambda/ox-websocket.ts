import { APIGatewayProxyEvent } from "aws-lambda";

export async function handler(event: APIGatewayProxyEvent) {
  const connectionId = event.requestContext.connectionId;
  const route = event.requestContext.routeKey;

  if (connectionId == null || route == null) {
    return;
  }

  console.log("Welcome!", connectionId, route);

  return {
    statusCode: 200,
  };
}
