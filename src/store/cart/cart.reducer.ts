import { AnyAction } from "redux";

import { setCartItems, setIsCartOpen } from "./cart.action";

import { CartItem } from "./cart.types";

export type CartState = {
  isCartOpen: boolean;
  cartItems: CartItem[];
};

export const INITIAL_STATE: CartState = {
  isCartOpen: false,
  cartItems: [],
};

export const cartReducer = (
  state: CartState = INITIAL_STATE,
  action: AnyAction
) => {
  if (setIsCartOpen.match(action)) {
    return {
      ...state,
      cartItems: action.payload,
    };
  }
  if (setCartItems.match(action)) {
    return {
      ...state,
      isCartOpen: action.payload,
    };
  }
  return state;
};
