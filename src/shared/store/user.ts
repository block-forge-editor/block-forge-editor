import { createStore } from "effector";

import { TUser } from "../types/auth/entities";

export const $user = createStore<null | TUser>({
  id: "123",
  email: "spa-front-starter@test.com",
});

export const $isAuthorized = $user.map((v) => !!v);
