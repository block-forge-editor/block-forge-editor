export const API_URL = import.meta.env.VITE_API_URL as string;
export const IS_DEV_MODE = import.meta.env.NODE_ENV === "development";
export const IS_PROD_MODE = import.meta.env.NODE_ENV === "production";
export const YANDEX_MAPS_API_KEY = import.meta.env
  .VITE_YANDEX_MAPS_API_KEY as string;
export const APP_ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY as string;
export const TOP_HOTELS_API_KEY = import.meta.env
  .VITE_TOP_HOTELS_API_KEY as string;
export const TOP_HOTELS_API_URL = import.meta.env
  .VITE_TOP_HOTELS_API_URL as string;
