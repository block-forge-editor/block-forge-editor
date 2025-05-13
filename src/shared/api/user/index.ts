import { createQuery } from "@farfetched/core";

import { getProfileFx } from "./effects";

export const createGetProfileQuery = () =>
  createQuery({
    effect: getProfileFx,
    name: "getProfileQueryCheck",
    mapData: ({ result }) => result.data,
  });

// use tools to handle errors
// MutationTools(authMutation).errors.handleAll();
