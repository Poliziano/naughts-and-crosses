import { createUser, getUser } from "../../lib/data/user";

test("ID for non-existing user returns null", async () => {
  const user = await getUser("random-id");
  expect(user).toBeNull();
});

test("ID for newly created user returns the new user", async () => {
  const user = await createUser();
  const response = await getUser(user.id);
  expect(response).toEqual(user);
});
