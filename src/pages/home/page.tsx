import { FC } from "react";

import { Layout } from "@/layouts";
import { useUnit } from "effector-react";

import { View, $$homeModel } from "./model";
import { Renderer } from "./renderer";

import { PageLoader } from "@/shared/ui/atoms";

export const HomePage: FC = () => {
  const view = useUnit($$homeModel.$view);

  if (view === View.ContentLoading) {
    return <PageLoader />;
  }

  return (
    <Layout mainTagClasses="flex flex-col items-center">
      <Renderer />
    </Layout>
  );
};
