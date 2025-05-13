import { Toaster } from "react-hot-toast";

import { RouterProvider } from "atomic-router-react";

import { ErrorBoundary } from "./error-boundary";

import { Pages } from "@/shared/routing";
import { router } from "@/shared/routing/shared";

export function App() {
  return (
    <RouterProvider router={router}>
      <ErrorBoundary>
        <Pages />
        <Toaster />
      </ErrorBoundary>
    </RouterProvider>
  );
}
