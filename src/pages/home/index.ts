import { createRouteView } from "atomic-router-react";

import { $$homeModel } from "./model";
import { HomePage } from "./page";

import { routes } from "@/shared/routing/shared";
import { RouteRecord } from "@/shared/routing/shared/types";
import { PageLoader } from "@/shared/ui/atoms";

export const HomeRoute: RouteRecord = {
  route: routes.home,
  view: createRouteView({
    view: HomePage,
    otherwise: PageLoader,
    route: $$homeModel.appLoadedRoute,
  }),
};
