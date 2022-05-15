import { createRoom, getRoom } from "../../lib/data/room";

test("ID for non-existing room returns null", async () => {
  const room = await getRoom("room-id");
  expect(room).toBeNull();
});

test("ID from newly created room returns the new room", async () => {
  const room = await createRoom({ id: "test-user-id" });
  const response = await getRoom(room.id);
  expect(response).toEqual(room);
});
