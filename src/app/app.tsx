// import { Toaster } from "react-hot-toast";

import { ErrorBoundary } from "./error-boundary";

import { Renderer } from "@/widgets/editor";

export function App() {
  return (
    <ErrorBoundary>
      {/* <Toaster /> */}
      <Renderer />
    </ErrorBoundary>
  );
}
