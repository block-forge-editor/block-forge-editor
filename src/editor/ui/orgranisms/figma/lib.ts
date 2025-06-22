import { FIGMA_URL } from "./constants";

export const getEmbedUrl = (url: string) => {
  if (!url) return "";

  try {
    const urlObj = new URL(url);

    if (!urlObj.hostname.includes("figma.com")) {
      return "";
    }

    const fileKey = urlObj.pathname.split("/").pop();
    if (!fileKey) return "";

    return `${FIGMA_URL}${encodeURIComponent(url)}`;
  } catch {
    return "";
  }
};
