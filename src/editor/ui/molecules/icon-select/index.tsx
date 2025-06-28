import { FC } from "react";

import {
  X,
  User,
  Star,
  Info,
  Mail,
  Link,
  File,
  Edit,
  Copy,
  Menu,
  Plus,
  Heart,
  Phone,
  Globe,
  Image,
  Trash,
  Share,
  Minus,
  MapPin,
  Folder,
  Upload,
  Search,
  Filter,
  ArrowUp,
  ThumbsUp,
  Settings,
  Download,
  ChevronUp,
  ArrowLeft,
  ArrowDown,
  HelpCircle,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  ChevronLeft,
  MoreVertical,
  ChevronRight,
  MessageSquare,
  MoreHorizontal,
} from "lucide-react";

import { cn } from "@/editor/lib/font-manager";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/editor/ui/shadcn/ui/popover";

type TIconSelectProps = {
  value: string;
  onChange: (value: string) => void;
};

const ICONS = {
  MessageSquare,
  User,
  Star,
  Heart,
  ThumbsUp,
  CheckCircle,
  AlertCircle,
  Info,
  HelpCircle,
  Settings,
  Mail,
  Phone,
  MapPin,
  Globe,
  Link,
  Image,
  File,
  Folder,
  Download,
  Upload,
  Trash,
  Edit,
  Copy,
  Share,
  MoreHorizontal,
  MoreVertical,
  Menu,
  X,
  Plus,
  Minus,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
} as const;

const AVAILABLE_ICONS = Object.keys(ICONS) as Array<keyof typeof ICONS>;

export const IconSelect: FC<TIconSelectProps> = ({ value, onChange }) => {
  const IconComponent = value ? ICONS[value as keyof typeof ICONS] : null;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="bf-flex bf-items-center bf-justify-center bf-size-12 bf-rounded-full bf-bg-gray-100 hover:bf-bg-gray-200 bf-transition-colors">
          {IconComponent ? (
            <IconComponent className="bf-size-6 bf-text-gray-500" />
          ) : (
            <Plus className="bf-size-6 bf-text-gray-500" />
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent align="center" className="bf-w-[300px] !bf-p-0">
        <div className="bf-h-[200px] bf-overflow-y-auto custom-scroll">
          <div className="bf-grid bf-grid-cols-6 bf-gap-2 bf-p-4">
            {AVAILABLE_ICONS.map((name) => {
              const Icon = ICONS[name];
              return (
                <button
                  key={name}
                  onClick={() => onChange(name)}
                  className={cn(
                    "bf-flex bf-items-center bf-justify-center bf-size-10 bf-rounded-lg hover:bf-bg-gray-100 bf-transition-colors",
                    value === name && "bf-bg-gray-100",
                  )}
                >
                  <Icon className="bf-size-5 bf-text-gray-500" />
                </button>
              );
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
