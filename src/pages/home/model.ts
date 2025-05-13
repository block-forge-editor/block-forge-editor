import { createStore } from "effector";

import { routes } from "@/shared/routing/shared";
import { chainAppLoaded } from "@/shared/routing/shared/app-loaded-chain";

export enum View {
  ContentLoading,
  Content,
}

const appLoadedRoute = chainAppLoaded(routes.home);

const $view = createStore<View | null>(View.Content);

export const $$homeModel = {
  $view,
  appLoadedRoute,
};
