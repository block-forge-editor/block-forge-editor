import {
  X,
  Gift,
  Link,
  List,
  Lock,
  Plus,
  Code,
  Image,
  Minus,
  Table,
  Trash,
  Quote,
  Clock,
  Circle,
  Loader,
  Pencil,
  Search,
  Share2,
  IdCard,
  Columns,
  Heading,
  Palette,
  Calendar,
  BarChart,
  AlignLeft,
  BedDouble,
  PhoneCall,
  AlignRight,
  FolderPlus,
  LayoutGrid,
  AlignCenter,
  PlaneLanding,
  PlaneTakeoff,
  ClipboardType,
  TvMinimalPlay,
  MessageSquare,
  Brush,
  Figma,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
} from "lucide-react";
import { renderToString } from "react-dom/server";
import { EColors } from "./colors-constants";

const ICON_CLASSES = "!size-4";

// TODO: refactor
export type TIconName =
  | "x"
  | "link"
  | "edit"
  | "left"
  | "user"
  | "plus"
  | "lock"
  | "list"
  | "grid"
  | "code"
  | "card"
  | "hotel"
  | "share"
  | "image"
  | "video"
  | "promo"
  | "right"
  | EColors
  | "table"
  | "quote"
  | "clock"
  | "folder"
  | "search"
  | "center"
  | "delete"
  | "layout"
  | "loading"
  | "heading"
  | "heading1"
  | "heading2"
  | "heading3"
  | "heading4"
  | "heading5"
  | "heading6"
  | "columns"
  | "youtube"
  | "palette"
  | "barChart"
  | "whatsapp"
  | "calendar"
  | "delimiter"
  | "accordion"
  | "formatSize"
  | "messageSquare"
  | "airplaneDepart"
  | "airplaneArrival"
  | "drawing"
  | "figma";

export const getIcon = (iconName: TIconName) => {
  switch (iconName) {
    case "drawing":
      return renderToString(<Brush className={ICON_CLASSES} />);
    case "accordion":
      return renderToString(<AlignCenter className={ICON_CLASSES} />);
    case "messageSquare":
      return renderToString(<MessageSquare className={ICON_CLASSES} />);
    case "clock":
      return renderToString(<Clock className={ICON_CLASSES} />);
    case "barChart":
      return renderToString(<BarChart className={ICON_CLASSES} />);
    case "code":
      return renderToString(<Code className={ICON_CLASSES} />);
    case "card":
      return renderToString(<IdCard className={ICON_CLASSES} />);
    case "promo":
      return renderToString(<Gift className={ICON_CLASSES} />);
    case "quote":
      return renderToString(<Quote className={ICON_CLASSES} />);
    case "palette":
      return renderToString(<Palette className={ICON_CLASSES} />);
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
    case "heading1":
      return renderToString(<Heading1 className={ICON_CLASSES} />);
    case "heading2":
      return renderToString(<Heading2 className={ICON_CLASSES} />);
    case "heading3":
      return renderToString(<Heading3 className={ICON_CLASSES} />);
    case "heading4":
      return renderToString(<Heading4 className={ICON_CLASSES} />);
    case "heading5":
      return renderToString(<Heading5 className={ICON_CLASSES} />);
    case "heading6":
      return renderToString(<Heading6 className={ICON_CLASSES} />);
    case "edit":
      return renderToString(<Pencil className={ICON_CLASSES} />);
    case "right":
      return renderToString(<AlignRight className={ICON_CLASSES} />);
    case "grid":
      return renderToString(<LayoutGrid className={ICON_CLASSES} />);
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
    case "layout":
      return renderToString(<LayoutGrid className={ICON_CLASSES} />);
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
    case EColors.RED:
      return renderToString(
        <Circle className={`${ICON_CLASSES} fill-red-500 text-red-500`} />,
      );
    case EColors.GREEN:
      return renderToString(
        <Circle className={`${ICON_CLASSES} fill-green-500 text-green-500`} />,
      );
    case EColors.PURPLE:
      return renderToString(
        <Circle
          className={`${ICON_CLASSES} fill-purple-500 text-purple-500`}
        />,
      );
    case EColors.PINK:
      return renderToString(
        <Circle className={`${ICON_CLASSES} fill-pink-500 text-pink-500`} />,
      );
    case EColors.ORANGE:
      return renderToString(
        <Circle
          className={`${ICON_CLASSES} fill-orange-500 text-orange-500`}
        />,
      );
    case EColors.TEAL:
      return renderToString(
        <Circle className={`${ICON_CLASSES} fill-teal-500 text-teal-500`} />,
      );
    case EColors.INDIGO:
      return renderToString(
        <Circle
          className={`${ICON_CLASSES} fill-indigo-500 text-indigo-500`}
        />,
      );
    case EColors.GRAY:
      return renderToString(
        <Circle className={`${ICON_CLASSES} fill-gray-500 text-gray-500`} />,
      );
    case EColors.BLACK:
      return renderToString(
        <Circle className={`${ICON_CLASSES} fill-black text-black`} />,
      );
    case EColors.WHITE:
      return renderToString(
        <Circle className={`${ICON_CLASSES} fill-white text-white`} />,
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
    case "figma":
      return renderToString(<Figma className={ICON_CLASSES} />);
    default:
      return renderToString(<Calendar className={ICON_CLASSES} />);
  }
};
