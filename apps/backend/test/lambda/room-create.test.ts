import { getRoom } from "../../lib/data/room";
import { createUser } from "../../lib/data/user";
import { handler } from "../../lib/lambda/room-create";
import { mockEvent } from "./mock-input";

test("do not create a room for a user who does not exist", async () => {
  const event = mockEvent({
    pathParameters: {
      userId: "some-user-id",
    },
  });
  const response = await handler(event);
  expect(response).toEqual({
    statusCode: 400,
    body: "",
  });
});

test("creates a room", async () => {
  const user = await createUser();
  const event = mockEvent({
    pathParameters: {
      userId: user.id,
    },
  });
  const response = await handler(event);
  expect(response).toEqual({
    statusCode: 200,
    body: expect.any(String),
  });

  const body = JSON.parse(response.body);
  const room = await getRoom(body.roomId);
  expect(room).toBeDefined();
});

test("do not create a room when invalid payload", async () => {
  const response = await handler(mockEvent());
  expect(response).toEqual({
    statusCode: 400,
    body: "",
  });
});
