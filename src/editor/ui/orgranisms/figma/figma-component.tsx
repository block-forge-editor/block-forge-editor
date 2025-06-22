import { FC, useMemo, useState } from "react";
import { ImageIcon } from "lucide-react";

import { ComponentHeader } from "@/editor/ui/molecules/component-header";
import { Input } from "@/editor/ui/shadcn/ui/input";
import { TFigmaData } from "./types";
import { TOOLBOX_TITLE } from "./constants";
import { getEmbedUrl } from "./lib";

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

  const embedUrl = useMemo(() => getEmbedUrl(localUrl), [localUrl]);

  const handleUrlChange = (value: string) => {
    setLocalUrl(value);
    onUpdate({
      figmaUrl: value,
    });
    onSave();
  };

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
          <div className="bf-h-[200px] bf-border-b bf-bg-white bf-rounded-lg bf-overflow-hidden bf-flex bf-items-center bf-justify-center">
            {embedUrl ? (
              <iframe
                src={embedUrl}
                className="bf-w-full bf-h-full"
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
