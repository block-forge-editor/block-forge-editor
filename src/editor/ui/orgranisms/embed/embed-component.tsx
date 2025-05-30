import { FC, useState } from "react";

import { Video as VideoIcon } from "lucide-react";

import { cn } from "@/editor/lib/utils";
import { ComponentHeader } from "@/editor/ui/molecules/component-header";
import { Input } from "@/editor/ui/shadcn/ui/input";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/editor/ui/shadcn/ui/select";

type TEmbedComponentProps = {
  url: string;
  variant: "primary" | "secondary";
  platform: "vimeo" | "other" | "youtube";
  onUpdate: (data: {
    url: string;
    platform: "vimeo" | "other" | "youtube";
  }) => void;
};

const PLATFORMS = [
  { id: "youtube", name: "YouTube" },
  { id: "vimeo", name: "Vimeo" },
  { id: "other", name: "Other" },
] as const;

const getEmbedUrl = (
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

export const EmbedComponent: FC<TEmbedComponentProps> = ({
  url,
  platform,
  variant,
  onUpdate,
}) => {
  const [localUrl, setLocalUrl] = useState(url);
  const [localPlatform, setLocalPlatform] = useState(platform);

  const handleUrlChange = (value: string) => {
    setLocalUrl(value);
    onUpdate({ url: value, platform: localPlatform });
  };

  const handlePlatformChange = (value: TEmbedComponentProps["platform"]) => {
    setLocalPlatform(value);
    onUpdate({ url: localUrl, platform: value });
  };

  const embedUrl = getEmbedUrl(localUrl, localPlatform);

  return (
    <div className="bf-relative bf-group bf-w-full bf-space-y-4">
      <ComponentHeader
        title="Embed"
        variant={variant}
        tooltipText="Component for embedding videos from various platforms"
      />

      <div className={cn("bf-min-h-[200px]")}>
        <div className="bf-flex bf-flex-col bf-gap-4">
          <div className="bf-flex bf-items-center bf-gap-2 bf-group/item">
            <Select value={localPlatform} onValueChange={handlePlatformChange}>
              <SelectTrigger className="!bf-w-32">
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                {PLATFORMS.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="text"
              value={localUrl}
              className="bf-flex-1"
              placeholder={`Enter ${localPlatform} URL`}
              onChange={(e) => handleUrlChange(e.target.value)}
            />
          </div>
          {embedUrl ? (
            <div className="bf-relative bf-aspect-video bf-w-full bf-overflow-hidden bf-rounded-lg">
              <iframe
                src={embedUrl}
                allowFullScreen
                className="bf-absolute bf-inset-0 bf-w-full bf-h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          ) : (
            <div className="bf-flex bf-flex-col bf-items-center bf-justify-center bf-h-[200px] bf-text-gray-400">
              <VideoIcon className="bf-size-8 bf-mb-2" />
              <span>No video URL entered</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
