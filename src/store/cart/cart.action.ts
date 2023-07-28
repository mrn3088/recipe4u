import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import { CategoryItem } from "../categories/category.types";
import {
  createAction,
  withMatcher,
  Action,
  ActionWithPayload,
} from "../../utils/reducer/reducer.utils";

const addCartItem = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
): CartItem[] => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (
  cartItems: CartItem[],
  productToRemove: CategoryItem
): CartItem[] => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToRemove.id
  );

  if (!existingCartItem) {
    return cartItems;
  }

  if (existingCartItem.quantity > 1) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  } else {
    return cartItems.filter((cartItems) => cartItems.id !== productToRemove.id);
  }
};

const clearCartItem = (
  cartItems: CartItem[],
  productToRemove: CategoryItem
) => {
  return cartItems.filter((cartItems) => cartItems.id !== productToRemove.id);
};

const clearAllCartItem = (): CartItem[] => {
  return [];
};

export type SetIsCartOpen = ActionWithPayload<
  CART_ACTION_TYPES.SET_IS_CART_OPEN,
  boolean
>;

export type SetCartItems = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_ITEMS,
  CartItem[]
>;

export const setIsCartOpen = withMatcher((boolean: boolean): SetIsCartOpen => {
  return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);
});

export const setCartItems = withMatcher(
  (cartItems: CartItem[]): SetCartItems =>
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);

export const addItemToCart = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return setCartItems(newCartItems);
};

export const removeItemFromCart = (
  cartItems: CartItem[],
  productToRemove: CategoryItem
) => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  return setCartItems(newCartItems);
};

export const clearItemFromCart = (
  cartItems: CartItem[],
  productToRemove: CategoryItem
) => {
  const newCartItems = clearCartItem(cartItems, productToRemove);
  return setCartItems(newCartItems);
};

export const clearAllItemsFromCart = (cartItems: CartItem[]) => {
  const newCartItems = clearAllCartItem();
  return setCartItems(newCartItems);
};
