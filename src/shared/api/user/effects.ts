/* eslint-disable @typescript-eslint/no-explicit-any */
import { attach } from "effector";

import { requestFx } from "../common/base-request";

import { TUser } from "@/shared/types/auth";
import { TFFRequest } from "@/shared/types/common";

export type TAuthResponse = TFFRequest<{ data: TUser }>;
export type TAuthPayload = {
  email: string;
  password: string;
};

export const getProfileFx = attach<void, TAuthResponse>({
  effect: requestFx,
  mapParams: (data) => ({
    data,
    url: "profile",
  }),
});
