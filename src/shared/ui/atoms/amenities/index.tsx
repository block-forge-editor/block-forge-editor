import { FC } from "react";

import {
  Tv,
  Bus,
  Car,
  Baby,
  Wifi,
  Wine,
  Heart,
  Plane,
  Users,
  Vault,
  Phone,
  Image,
  Trees,
  Clock3,
  Guitar,
  Coffee,
  Printer,
  Martini,
  AirVent,
  BusFront,
  Landmark,
  UserPlus,
  Dumbbell,
  TreePalm,
  Briefcase,
  Handshake,
  UserCheck,
  Microwave,
  DollarSign,
  CheckCircle,
  ParkingCircle,
  ShoppingBasket,
  BadgeDollarSign,
  UtensilsCrossed,
  RefrigeratorIcon,
} from "lucide-react";

import { TAmenity } from "@/shared/types/common/entities/tours";

type TProps = {
  className?: string;
  amenities?: null | TAmenity[];
};

const iconProps = {
  className: "size-5 text-gray-600",
  strokeWidth: 1,
};

const OPTIONS = {
  "platnyie-uslugi": <DollarSign {...iconProps} />,
  "besplatnyiy-wi-fi": <Wifi {...iconProps} />,
  avtostoyanka: <ParkingCircle {...iconProps} />,
  "uslugi-konsyerzha": <UserCheck {...iconProps} />,
  "hranenie-bagazha": <Briefcase {...iconProps} />,
  "ekskursionnoe-byuro": <Bus {...iconProps} />,
  "obmen-valyutyi": <BadgeDollarSign {...iconProps} />,
  "kruglosutochnaya-stoyka-registracii": <Clock3 {...iconProps} />,
  "nyanya---uslugi-po-uhodu-za-detymi": <Baby {...iconProps} />,
  fakskserokopirovanie: <Printer {...iconProps} />,
  "biznes-tsentr": <Handshake {...iconProps} />,
  "konferents-zalbanketnyy-zal": <Landmark {...iconProps} />,
  transfer: <BusFront {...iconProps} />,
  "mini-market": <ShoppingBasket {...iconProps} />,
  "dlya-semeynogo-otdyiha": <Users {...iconProps} />,
  "dlya-par": <UserPlus {...iconProps} />,
  "dlya-molodozhenov": <Heart {...iconProps} />,
  "dlya-molodezhi": <Users {...iconProps} />,
  "do-aeroporta-km": <Plane {...iconProps} />,
  restoran: <UtensilsCrossed {...iconProps} />,
  bar: <Martini {...iconProps} />,
  "mini-bar": <Wine {...iconProps} />,
  kofevarkacainik: <Coffee {...iconProps} />,
  "vid-iz-okna": <Image {...iconProps} />,
  "vid-na-sad": <Trees {...iconProps} />,
  telefon: <Phone {...iconProps} />,
  televizor: <Tv {...iconProps} />,
  massazh: <Dumbbell {...iconProps} />,
  "prokat-avtomobiley": <Car {...iconProps} />,
  "zhivaya-muzykavystuplenie": <Guitar {...iconProps} />,
  "chastnyy-plyazh": <TreePalm {...iconProps} />,
  seyf: <Vault {...iconProps} />,
  seif: <Vault {...iconProps} />,
  xolodilnik: <RefrigeratorIcon {...iconProps} />,
  "mikrovolnovaia-pec": <Microwave {...iconProps} />,
  kondicioner: <AirVent {...iconProps} />,
};

export const Amenities: FC<TProps> = ({ amenities, className = "" }) => {
  if (!amenities?.length) return null;

  return (
    <ul className={`w-full flex flex-col gap-y-2 ${className}`}>
      {amenities?.map(({ name, code, id }) => (
        <li key={id} className="flex items-center gap-x-2 overflow-hidden">
          <div className="min-w-5">
            {OPTIONS[code as keyof typeof OPTIONS] ?? (
              <CheckCircle {...iconProps} />
            )}
          </div>
          <p className="text-sm whitespace-nowrap truncate">{name}</p>
        </li>
      ))}
    </ul>
  );
};
