import { FC } from "react";

type TProps = {
  Header?: JSX.Element;
  Footer?: JSX.Element;
  data: {
    label: string;
    value: string;
  }[];
};

const CardLine: FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="w-full flex items-center justify-between gap-x-2 text-sm">
    <p className="text-nowrap">{label}:</p>
    <span className="border-b border-dotted w-full h-5" />
    <p className="text-nowrap">{value}</p>
  </div>
);

export const Card: FC<TProps> = ({ data, Header, Footer }) => {
  return (
    <div className="w-full rounded-md border p-4 flex flex-col gap-y-4 shadow-md">
      {Header}
      {data.map(({ label, value }, index) => (
        <CardLine key={index} label={label} value={value} />
      ))}
      {Footer}
    </div>
  );
};
