import { createHistoryRouter } from "atomic-router";

import { controls } from "./controls";
import { home, authError } from "./routes";

export enum ERoutes {
  Main = "/",
  AuthError = "/auth-error",
}

const routes = [
  { route: home, path: ERoutes.Main },
  { route: authError, path: ERoutes.AuthError },
];

export const router = createHistoryRouter({ routes, controls });
