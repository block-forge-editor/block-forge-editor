import { FC, Fragment } from "react";
import { useTranslation } from "react-i18next";

import { Label } from "@radix-ui/react-label";
import { REGEXP_ONLY_DIGITS } from "input-otp";

import {
  InputOTP,
  InputOTPSlot,
  InputOTPGroup,
} from "../../shadcn/ui/input-otp";

type TProps = {
  onComplete: (otp: string) => void;
};

export const OtpInput: FC<TProps> = ({ onComplete }) => {
  const { t } = useTranslation();

  return (
    <>
      <Label className="mb-2">{t("ENTER_CODE_FROM_SMS")}</Label>
      <InputOTP
        autoFocus
        maxLength={4}
        onComplete={onComplete}
        pattern={REGEXP_ONLY_DIGITS}
        render={({ slots }) => (
          <InputOTPGroup className="flex justify-between items-stretch gap-3 w-full">
            {slots.map((slot, index) => (
              <Fragment key={index}>
                <InputOTPSlot
                  className="bg-slate-100 first:rounded-xl last:rounded-xl rounded-xl border-none flex-1 h-16 text-3xl text-slate-600 font-semibold"
                  {...slot}
                />
              </Fragment>
            ))}
          </InputOTPGroup>
        )}
      />
    </>
  );
};
