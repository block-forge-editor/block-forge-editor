import { FC, useState } from "react";

import { X, Plus, Link } from "lucide-react";

import { EditorButton } from "@/editor/ui/molecules";
import { ComponentHeader } from "@/editor/ui/molecules/component-header";
import { Input } from "@/editor/ui/shadcn/ui/input";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/editor/ui/shadcn/ui/select";

type TSocialComponentProps = {
  variant: "primary" | "secondary";
  links: Array<{
    url: string;
    platform: string;
  }>;
  onUpdate: (links: Array<{ url: string; platform: string }>) => void;
  onUpdateWithRerender: (
    links: Array<{ url: string; platform: string }>,
  ) => void;
};

const PLATFORMS = [
  { id: "facebook", name: "Facebook" },
  { id: "twitter", name: "Twitter" },
  { id: "instagram", name: "Instagram" },
  { id: "linkedin", name: "LinkedIn" },
  { id: "github", name: "GitHub" },
  { id: "youtube", name: "YouTube" },
  { id: "tiktok", name: "TikTok" },
  { id: "telegram", name: "Telegram" },
] as const;

export const SocialComponent: FC<TSocialComponentProps> = ({
  links = [],
  variant,
  onUpdate,
  onUpdateWithRerender,
}) => {
  const [localLinks, setLocalLinks] = useState(links);

  const handleAddLink = () => {
    const newLinks = [...localLinks, { platform: PLATFORMS[0].id, url: "" }];
    setLocalLinks(newLinks);
    onUpdateWithRerender(newLinks);
  };

  const handleRemoveLink = (index: number) => {
    const newLinks = localLinks.filter((_, i) => i !== index);
    setLocalLinks(newLinks);
    onUpdateWithRerender(newLinks);
  };

  const handleLinkChange = (
    index: number,
    field: "url" | "platform",
    value: string,
  ) => {
    const newLinks = localLinks.map((link, i) =>
      i === index ? { ...link, [field]: value } : link,
    );
    setLocalLinks(newLinks);
    onUpdate(newLinks);
  };

  return (
    <div className="bf-relative bf-group bf-w-full bf-space-y-4">
      <ComponentHeader
        variant={variant}
        title="Social Links"
        tooltipText="Add your social media profiles and links"
      >
        <EditorButton
          onClick={handleAddLink}
          className="bf-rounded-xl bf-p-1 hover:bf-bg-gray-100 bf-transition-colors"
        >
          <Plus className="bf-size-4 bf-text-gray-600" />
        </EditorButton>
      </ComponentHeader>

      <div className="bf-min-h-[200px]">
        <div className="bf-flex bf-flex-col bf-gap-4">
          {localLinks.map((link, index) => (
            <div
              key={index}
              className="bf-flex bf-items-center bf-gap-2 bf-group/item"
            >
              <Select
                value={link.platform}
                onValueChange={(value) =>
                  handleLinkChange(index, "platform", value)
                }
              >
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
                value={link.url}
                className="bf-flex-1"
                placeholder="Enter profile URL"
                onChange={(e) => handleLinkChange(index, "url", e.target.value)}
              />
              <EditorButton
                onClick={() => handleRemoveLink(index)}
                className="bf-p-1 bf-text-gray-500 bf-rounded-md hover:bf-bg-gray-50 bf-opacity-0 group-hover/item:bf-opacity-100 bf-transition-opacity"
              >
                <X className="bf-size-4" />
              </EditorButton>
            </div>
          ))}
          {localLinks.length === 0 && (
            <div className="bf-flex bf-flex-col bf-items-center bf-justify-center bf-h-[200px] bf-text-gray-400">
              <Link className="bf-size-8 bf-mb-2" />
              <span>No social links yet</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
