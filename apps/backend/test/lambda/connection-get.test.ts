import { createRoom } from "../../lib/data/room";
import { handler } from "../../lib/lambda/connection-get";
import { mockEvent } from "./mock-input";

test("returns zero rooms for non-existent user", async () => {
  const event = mockEvent({
    pathParameters: {
      userId: "some-user-id",
    },
  });
  const response = await handler(event);
  expect(response).toEqual({
    statusCode: 200,
    body: expect.any(String),
  });

  const body = JSON.parse(response.body);
  expect(body.rooms).toEqual([]);
});

test("returns rooms", async () => {
  const room = await createRoom({ id: "host-user-id" });
  const event = mockEvent({
    pathParameters: {
      userId: "host-user-id",
    },
  });
  const response = await handler(event);
  expect(response).toEqual({
    statusCode: 200,
    body: expect.any(String),
  });

  const body = JSON.parse(response.body);
  expect(body.rooms).toEqual([room.id]);
});

test("returns 400 Bad Request when user id not provided", async () => {
  const response = await handler(mockEvent());
  expect(response).toEqual({
    statusCode: 400,
    body: "",
  });
});
