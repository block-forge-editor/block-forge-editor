import { AuthErrorRoute } from "@/pages/auth-error";
import { HomeRoute } from "@/pages/home";
import { NotFoundPage } from "@/pages/not-found";
import { createRoutesView } from "atomic-router-react";

export const Pages = createRoutesView({
  routes: [HomeRoute, AuthErrorRoute],
  otherwise: NotFoundPage,
});
