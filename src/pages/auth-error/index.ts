import { createRouteView } from "atomic-router-react";

import { AuthErrorPage } from "./page";

import { routes } from "@/shared/routing/shared";
import { RouteRecord } from "@/shared/routing/shared/types";
import { PageLoader } from "@/shared/ui/atoms";

export const AuthErrorRoute: RouteRecord = {
  route: routes.authError,
  view: createRouteView({
    view: AuthErrorPage,
    otherwise: PageLoader,
    route: routes.authError,
  }),
};
