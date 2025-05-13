import { FC } from "react";

import { useUnit } from "effector-react";

import { $$counterModel } from "./model";

export const Counter: FC = () => {
  const [clicksCount, buttonClicked] = useUnit([
    $$counterModel.$clicksCount,
    $$counterModel.buttonClicked,
  ]);

  return (
    <button onClick={buttonClicked} className="bg-blue-500 text-white p-2">
      {clicksCount}
    </button>
  );
};
