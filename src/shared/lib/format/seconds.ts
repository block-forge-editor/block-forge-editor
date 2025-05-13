import dayjs from "dayjs";

export const formatSeconds = (seconds: number) => {
  return dayjs().startOf("day").add(seconds, "seconds").format("mm:ss");
};
