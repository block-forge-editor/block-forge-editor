import { FC, useState } from "react";
import { ImageIcon } from "lucide-react";

import { ComponentHeader } from "@/editor/ui/molecules/component-header";
import { TOOLBOX_TITLE } from ".";
import { Input } from "@/editor/ui/shadcn/ui/input";
import { TFigmaData } from "./types";

type TFigmaComponentProps = {
  data: TFigmaData;
  onUpdate: (data: TFigmaData) => void;
  onSave: VoidFunction;
};

export const FigmaComponent: FC<TFigmaComponentProps> = ({
  data,
  onUpdate,
  onSave,
}) => {
  const [localUrl, setLocalUrl] = useState(data.figmaUrl || "");

  const getEmbedUrl = (url: string) => {
    if (!url) return "";

    try {
      const urlObj = new URL(url);

      if (!urlObj.hostname.includes("figma.com")) {
        return "";
      }

      const fileKey = urlObj.pathname.split("/").pop();
      if (!fileKey) return "";

      return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(
        url,
      )}`;
    } catch {
      return "";
    }
  };

  const handleUrlChange = (value: string) => {
    setLocalUrl(value);
    onUpdate({
      figmaUrl: value,
    });
    onSave();
  };

  const embedUrl = getEmbedUrl(localUrl);

  return (
    <div className="bf-space-y-4 bf-group">
      <ComponentHeader
        title={TOOLBOX_TITLE}
        tooltipText="Component for embedding Figma documents"
      />

      <div className="bf-mt-4 bf-flex bf-flex-col bf-gap-4">
        <div className="bf-flex bf-items-center bf-gap-2 bf-group/item">
          <Input
            type="text"
            value={localUrl}
            className="bf-flex-1"
            placeholder="Enter Figma document URL"
            onChange={(e) => handleUrlChange(e.target.value)}
          />
        </div>

        <div className="bf-relative bf-group/item">
          <div className="bf-h-[300px] bf-bg-white bf-rounded-lg bf-shadow-sm bf-overflow-hidden bf-flex bf-items-center bf-justify-center">
            {embedUrl ? (
              <iframe
                src={embedUrl}
                className="bf-w-full bf-h-full"
                style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}
                allowFullScreen
              />
            ) : (
              <div className="bf-flex bf-flex-col bf-items-center bf-justify-center bf-text-gray-400">
                <ImageIcon className="bf-size-8 bf-mb-2" />
                No Figma document embedded yet
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
