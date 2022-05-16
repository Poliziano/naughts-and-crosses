import { APIGatewayProxyEvent, Context } from "aws-lambda";

export function mockContext(value: Partial<Context> = {}): Context {
  const context: Partial<Context> = {
    ...value,
  };
  return context as Context;
}

export function mockEvent(
  value: Partial<APIGatewayProxyEvent> = {}
): APIGatewayProxyEvent {
  const event: Partial<APIGatewayProxyEvent> = {
    ...value,
  };
  return event as APIGatewayProxyEvent;
}
