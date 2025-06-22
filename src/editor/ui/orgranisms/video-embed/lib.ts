import { TEmbedComponentProps } from "./types";

export const getEmbedUrl = (
  url: string,
  platform: TEmbedComponentProps["platform"],
) => {
  if (!url) return "";

  try {
    const urlObj = new URL(url);

    switch (platform) {
      case "youtube": {
        const videoId = urlObj.searchParams.get("v");
        return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
      }
      case "vimeo": {
        const vimeoId = urlObj.pathname.split("/").pop();
        return vimeoId ? `https://player.vimeo.com/video/${vimeoId}` : "";
      }
      default:
        return url;
    }
  } catch {
    return "";
  }
};
