import { FC } from "react";

import { Layout } from "@/layouts";

import { PageStatus } from "@/entities/page-status";

export const NotFoundPage: FC = () => (
  <Layout mainTagClasses="flex items-center justify-center">
    <PageStatus type={404} />
  </Layout>
);
