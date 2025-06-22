export type TEmbedComponentProps = {
  url: string;
  platform: "vimeo" | "other" | "youtube";
  onUpdate: (data: {
    url: string;
    platform: "vimeo" | "other" | "youtube";
  }) => void;
};
