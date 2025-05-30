type TGetResizedLink = {
  src?: string;
  quality?: number;
  width?: number | "auto";
  height?: number | "auto";
};

const IMAGE_DEFAULT_QUALITY = 90;
const LOCAL_IMAGES_START_PATHS = ["data:", "/"];
const SUPPORTED_IMAGE_FORMATS = ["jpg", "jpeg", "png", "webp"];

export const getResizedLink = ({
  src,
  width = "auto",
  height = "auto",
  quality = IMAGE_DEFAULT_QUALITY,
}: TGetResizedLink) => {
  if (
    !src ||
    LOCAL_IMAGES_START_PATHS.some((prefix) => src.startsWith(prefix)) ||
    !SUPPORTED_IMAGE_FORMATS.includes(src.split(".").pop() || "")
  ) {
    return src;
  }

  const size = `${width}_${height}_${quality}_`;

  const array = src.split("/");

  const firstPart = [...array];
  firstPart.pop();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const lastPart = [...array].pop()!;

  const ext = lastPart.split(".")[1];
  const name = lastPart.split(".")[0];
  const newLastPart = `${size}${name}.${ext}`;

  const newSrc = [...firstPart, newLastPart]
    .join("/")
    .replace("/storage/", "/storage/resize/");
  return newSrc;
};
