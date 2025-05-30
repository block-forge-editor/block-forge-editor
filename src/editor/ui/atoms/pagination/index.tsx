import { FC } from "react";

import {
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationContent,
  PaginationPrevious,
  Pagination as ShaPagination,
} from "@/editor/ui/shadcn";

type TProps = {
  page: number;
  totalPages: number;
  onChange: (v: number) => void;
};

export const Pagination: FC<TProps> = ({ totalPages, page, onChange }) => {
  return (
    <ShaPagination className="bf-mt-4 bf-w-full">
      <PaginationContent>
        <PaginationItem onClick={() => onChange(page - 1)}>
          <PaginationPrevious />
        </PaginationItem>

        {Array.from({ length: totalPages }).map((_, index) => (
          <PaginationItem key={index} onClick={() => onChange(index + 1)}>
            <PaginationLink isActive={page === index + 1}>
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem onClick={() => onChange(page + 1)}>
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </ShaPagination>
  );
};
