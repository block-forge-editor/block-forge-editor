import { parse, format } from "date-fns";

export const formatDates = ({
  dateFields,
  fromFormat,
  toFormat,
}: {
  toFormat: string;
  fromFormat: string;
  dateFields: Record<string, string>;
}) => {
  return Object.keys(dateFields).reduce((acc, key) => {
    const dateStr = dateFields[key];
    if (!dateStr || typeof dateStr !== "string") {
      return acc;
    }

    return {
      ...acc,
      [key]: format(parse(dateStr, fromFormat, new Date()), toFormat),
    };
  }, {});
};
