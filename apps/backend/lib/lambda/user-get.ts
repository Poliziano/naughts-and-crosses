import { APIGatewayProxyResult } from "aws-lambda";
import { createUser } from "../data/user";

export async function handler(): Promise<APIGatewayProxyResult> {
  const user = await createUser();

  return {
    statusCode: 200,
    body: JSON.stringify({
      userId: user.id,
    }),
  };
}
