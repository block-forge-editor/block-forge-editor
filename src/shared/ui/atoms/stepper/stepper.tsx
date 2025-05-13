import { FC, Fragment } from "react";

import { Check } from "lucide-react";

type TProps = {
  content: string[];
  className?: string;
  activeStep: number;
};

export const Stepper: FC<TProps> = ({
  activeStep,
  content = [],
  className = "",
}) => {
  return (
    <ul
      className={`flex items-center justify-between w-full gap-x-2 ${className}`}
    >
      {content.map((title, index) => {
        const currentStep = index + 1;
        const isActiveStep = currentStep === activeStep;
        const isUpcomingStep = currentStep > activeStep;
        const isPastStep = currentStep < activeStep;

        return (
          <Fragment key={index}>
            {index !== 0 && (
              <span
                className={`${
                  isUpcomingStep ? "bg-gray-300" : "bg-brand"
                } h-0.5 w-full`}
              />
            )}
            <li key={index} className="flex items-center gap-x-3">
              <div className="relative">
                <div
                  className={`${
                    isUpcomingStep
                      ? "bg-transparent text-gray-400 border-gray-400 border"
                      : "bg-brand text-white border border-transparent"
                  } rounded-full  font-semibold size-8 flex items-center justify-center relative z-20`}
                >
                  {isPastStep ? (
                    <Check className="size-5 text-white" />
                  ) : (
                    <span>{currentStep}</span>
                  )}
                </div>
                {isActiveStep && (
                  <span className="absolute -top-[4px] -left-[4px] rounded-full size-10 bg-secondary z-10" />
                )}
              </div>
              {isActiveStep && (
                <p className="text-sm whitespace-nowrap">{title}</p>
              )}
            </li>
          </Fragment>
        );
      })}
    </ul>
  );
};
