// This makes TypeScript understand the remote module and its exports
declare module "store_remote/Store" {
  import { Dispatch, SetStateAction } from "react";

  type CartItem = any;

  export const useStore: () => {
    cart: CartItem[];
    setCart: (items: CartItem[]) => void;
  };
}
