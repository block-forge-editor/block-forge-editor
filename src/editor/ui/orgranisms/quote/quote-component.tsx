import { FC, useState } from "react";

import { X, Plus, QuoteIcon } from "lucide-react";

import { cn } from "@/editor/lib/utils";
import {
  EditorInput,
  EditorButton,
  EditorTextarea,
  ComponentHeader,
} from "@/editor/ui/molecules";

type TQuoteComponentProps = {
  text: string;
  author?: string;
  source?: string;
  variant: "primary" | "secondary";
  onUpdate: (data: { text: string; author?: string; source?: string }) => void;
};

export const QuoteComponent: FC<TQuoteComponentProps> = ({
  text,
  author,
  source,
  variant,
  onUpdate,
}) => {
  const [localText, setLocalText] = useState(text);
  const [localAuthor, setLocalAuthor] = useState(author || "");
  const [localSource, setLocalSource] = useState(source || "");

  const handleTextChange = (value: string) => {
    setLocalText(value);
    onUpdate({ text: value, author: localAuthor, source: localSource });
  };

  const handleAuthorChange = (value: string) => {
    setLocalAuthor(value);
    onUpdate({ text: localText, author: value, source: localSource });
  };

  const handleSourceChange = (value: string) => {
    setLocalSource(value);
    onUpdate({ text: localText, author: localAuthor, source: value });
  };

  return (
    <div className="bf-relative bf-group bf-w-full bf-space-y-4">
      <ComponentHeader
        title="Quote"
        variant={variant}
        tooltipText="Add a quote with author and source"
      >
        <EditorButton
          variant="icon"
          onClick={() => {
            setLocalText("");
            setLocalAuthor("");
            setLocalSource("");
            onUpdate({ text: "", author: "", source: "" });
          }}
        >
          <Plus className="size-4 text-gray-600" />
        </EditorButton>
      </ComponentHeader>

      <div className="bf-min-h-[200px]">
        <div className="bf-grid bf-grid-cols-1 bf-gap-4">
          <div className="bf-border-b bf-border-r bf-p-2 bf-flex bf-flex-col bf-gap-4 bf-group/item">
            <div className="bf-flex bf-items-start bf-justify-between bf-gap-4">
              <div className="bf-flex bf-items-center bf-gap-3 bf-w-full">
                <QuoteIcon className="bf-size-12 bf-text-gray-400 bf-flex-shrink-0" />
                <div className="bf-flex-1">
                  <EditorInput
                    value={localAuthor}
                    placeholder="Enter author name"
                    onChange={(e) => handleAuthorChange(e.target.value)}
                  />
                  <EditorInput
                    variant="secondary"
                    value={localSource}
                    placeholder="Enter source"
                    onChange={(e) => handleSourceChange(e.target.value)}
                  />
                </div>
              </div>
              <EditorButton
                variant="secondary"
                onClick={() => {
                  setLocalText("");
                  setLocalAuthor("");
                  setLocalSource("");
                  onUpdate({ text: "", author: "", source: "" });
                }}
              >
                <X className="bf-size-4" />
              </EditorButton>
            </div>
            <div className="bf-flex-1">
              <EditorTextarea
                rows={3}
                value={localText}
                placeholder="Enter quote text"
                onChange={(e) => handleTextChange(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
