import {
  redirect,
  chainRoute,
  RouteParams,
  RouteInstance,
  RouteParamsAndQuery,
} from "atomic-router";
import { sample, createEvent } from "effector";
import { not } from "patronum";

import { controls } from "./controls";
import { authError } from "./routes";

import { createGetProfileQuery } from "@/shared/api/user";
import { $user, $isAuthorized } from "@/shared/store/user";

export function chainAppLoaded<Params extends RouteParams>(
  route: RouteInstance<Params>,
) {
  const getProfileQuery = createGetProfileQuery();

  const checkStarted = createEvent<RouteParamsAndQuery<Params>>();
  const checkFinished = createEvent();
  const checkFailed = createEvent();

  sample({
    clock: checkStarted,
    source: controls.$query,
    filter: not($isAuthorized),
    fn: (query) => query?.token as string,
    target: getProfileQuery.start,
  });

  sample({
    clock: checkStarted,
    filter: $isAuthorized,
    target: checkFinished,
  });

  sample({
    clock: getProfileQuery.finished.success,
    fn: (data) => data.result,
    target: [$user, checkFinished],
  });

  sample({
    clock: getProfileQuery.finished.failure,
    target: checkFailed,
  });

  redirect({
    clock: checkFailed,
    route: authError,
  });

  return chainRoute({
    route,
    beforeOpen: checkStarted,
    openOn: checkFinished,
  });
}
