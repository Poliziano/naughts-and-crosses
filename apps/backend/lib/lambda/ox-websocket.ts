import { APIGatewayProxyEvent } from "aws-lambda";

export async function handler(event: APIGatewayProxyEvent) {
  const connectionId = event.requestContext.connectionId;
  const route = event.requestContext.routeKey;

  console.log("Welcome!", connectionId, route);

  return {
    statusCode: 200,
  };
}
