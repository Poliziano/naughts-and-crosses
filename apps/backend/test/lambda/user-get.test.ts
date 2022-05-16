import { getUser } from "../../lib/data/user";
import { handler } from "../../lib/lambda/user-get";

test("acquire user ID", async () => {
  const response = await handler();
  expect(response).toEqual({
    statusCode: 200,
    body: expect.any(String),
  });

  const body = JSON.parse(response.body);
  const user = await getUser(body.userId);
  expect(user).toBeDefined();
});
