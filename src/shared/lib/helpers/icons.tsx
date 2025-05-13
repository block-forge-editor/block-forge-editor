import {
  X,
  Gift,
  Link,
  List,
  Lock,
  Plus,
  Image,
  Minus,
  Table,
  Trash,
  Circle,
  Loader,
  Pencil,
  Search,
  Share2,
  Columns,
  Heading,
  Calendar,
  AlignLeft,
  BedDouble,
  PhoneCall,
  AlignRight,
  FolderPlus,
  AlignCenter,
  PlaneLanding,
  PlaneTakeoff,
  ClipboardType,
  TvMinimalPlay,
} from "lucide-react";
import { renderToString } from "react-dom/server";

export enum EColors {
  DEFAULT = "transparent",
  BLUE = "blue",
  YELLOW = "yellow",
}

const ICON_CLASSES = "!size-4";

export type TIconName =
  | "x"
  | "link"
  | "edit"
  | "left"
  | "user"
  | "plus"
  | "lock"
  | "list"
  | "hotel"
  | "share"
  | "image"
  | "video"
  | "promo"
  | "right"
  | EColors
  | "table"
  | "folder"
  | "search"
  | "center"
  | "delete"
  | "loading"
  | "heading"
  | "columns"
  | "whatsapp"
  | "calendar"
  | "delimiter"
  | "formatSize"
  | "airplaneDepart"
  | "airplaneArrival";

export const getIcon = (iconName: TIconName) => {
  switch (iconName) {
    case "promo":
      return renderToString(<Gift className={ICON_CLASSES} />);
    case "whatsapp":
      return renderToString(<PhoneCall className={ICON_CLASSES} />);
    case "link":
      return renderToString(<Link className={ICON_CLASSES} />);
    case "hotel":
      return renderToString(<BedDouble className={ICON_CLASSES} />);
    case "share":
      return renderToString(<Share2 className={ICON_CLASSES} />);
    case "folder":
      return renderToString(<FolderPlus className={ICON_CLASSES} />);
    case "image":
      return renderToString(<Image className={ICON_CLASSES} />);
    case "search":
      return renderToString(<Search className={ICON_CLASSES} />);
    case "video":
      return renderToString(<TvMinimalPlay className={ICON_CLASSES} />);
    case "loading":
      return renderToString(<Loader className={ICON_CLASSES} />);
    case "formatSize":
      return renderToString(<ClipboardType className={ICON_CLASSES} />);
    case "heading":
      return renderToString(<Heading className={ICON_CLASSES} />);
    case "edit":
      return renderToString(<Pencil className={ICON_CLASSES} />);
    case "right":
      return renderToString(<AlignRight className={ICON_CLASSES} />);
    case "center":
      return renderToString(<AlignCenter className={ICON_CLASSES} />);
    case "left":
      return renderToString(<AlignLeft className={ICON_CLASSES} />);
    case "airplaneDepart":
      return renderToString(<PlaneTakeoff className={ICON_CLASSES} />);
    case "airplaneArrival":
      return renderToString(<PlaneLanding className={ICON_CLASSES} />);
    case "calendar":
      return renderToString(<Calendar className={ICON_CLASSES} />);
    case EColors.YELLOW:
      return renderToString(
        <Circle
          className={`${ICON_CLASSES} fill-yellow-500 text-yellow-500`}
        />,
      );
    case EColors.BLUE:
      return renderToString(
        <Circle className={`${ICON_CLASSES} fill-blue-500 text-blue-500`} />,
      );
    case EColors.DEFAULT:
      return renderToString(<Circle className={ICON_CLASSES} />);
    case "columns":
      return renderToString(<Columns className={ICON_CLASSES} />);
    case "delete":
      return renderToString(<Trash className={ICON_CLASSES} />);
    case "x":
      return renderToString(<X className={ICON_CLASSES} />);
    case "plus":
      return renderToString(<Plus className={ICON_CLASSES} />);
    case "lock":
      return renderToString(<Lock className={ICON_CLASSES} />);
    case "table":
      return renderToString(<Table className={ICON_CLASSES} />);
    case "list":
      return renderToString(<List className={ICON_CLASSES} />);
    case "delimiter":
      return renderToString(<Minus className={ICON_CLASSES} />);
    default:
      return renderToString(<Calendar className={ICON_CLASSES} />);
  }
};
