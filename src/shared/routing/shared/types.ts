/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentType } from "react";

import { RouteParams, RouteInstance } from "atomic-router";

export type RouteRecord<Props = any, Params extends RouteParams = any> = {
  view: ComponentType<Props>;
  route: RouteInstance<Params> | RouteInstance<Params>[];
};
