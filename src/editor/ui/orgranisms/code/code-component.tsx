import { FC, useState } from "react";

import { cn } from "@/editor/lib/font-manager";
import { ComponentHeader } from "@/editor/ui/molecules/component-header";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/editor/ui/shadcn/ui/select";
import { Textarea } from "@/editor/ui/shadcn/ui/textarea";
import { TOOLBOX_TITLE } from "./constants";

type TCodeComponentProps = {
  code: string;
  language: string;
  onUpdate: (data: { code: string; language: string }) => void;
};

const SUPPORTED_LANGUAGES = [
  "javascript",
  "typescript",
  "python",
  "java",
  "cpp",
  "csharp",
  "php",
  "ruby",
  "go",
  "rust",
  "html",
  "css",
  "json",
  "markdown",
  "bash",
  "plaintext",
] as const;

export const CodeComponent: FC<TCodeComponentProps> = ({
  code,
  language,
  onUpdate,
}) => {
  const [localCode, setLocalCode] = useState(code);
  const [localLanguage, setLocalLanguage] = useState(language);

  const handleCodeChange = (value: string) => {
    setLocalCode(value);
    onUpdate({ code: value, language: localLanguage });
  };

  const handleLanguageChange = (value: string) => {
    setLocalLanguage(value);
    onUpdate({ code: localCode, language: value });
  };

  return (
    <div className="bf-relative bf-group bf-w-full bf-space-y-4">
      <ComponentHeader
        title={TOOLBOX_TITLE}
        tooltipText="Component for displaying code snippets with syntax highlighting"
      />

      <div className={cn("bf-min-h-[200px]")}>
        <div className="bf-flex bf-flex-col bf-gap-4">
          <div className="bf-flex bf-items-center bf-gap-2 bf-group/item">
            <Select value={localLanguage} onValueChange={handleLanguageChange}>
              <SelectTrigger className="bf-w-32">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Textarea
            value={localCode}
            placeholder="Enter your code here..."
            onChange={(e) => handleCodeChange(e.target.value)}
            className="bf-font-mono bf-text-sm bf-min-h-[200px]"
          />
        </div>
      </div>
    </div>
  );
};
