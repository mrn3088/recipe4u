import { useSelector, useDispatch } from "react-redux";

import {
  selectCartTotal,
  selectCartItems,
} from "../../store/cart/cart.selector";

import { clearAllItemsFromCart } from "../../store/cart/cart.action";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import PaymentForm from "../../components/payment-form/payment-form.component";
import {
  CheckoutContainer,
  CheckoutHeaderContainer,
  ClearButtonContainer,
  HeaderBlockContainer,
  TotalContainer,
} from "./checkout.styles";

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const dispatch = useDispatch();

  return (
    <CheckoutContainer>
      <CheckoutHeaderContainer>
        <HeaderBlockContainer>
          <span>Product</span>
        </HeaderBlockContainer>
        <HeaderBlockContainer>
          <span>Description</span>
        </HeaderBlockContainer>
        <HeaderBlockContainer>
          <span>Quantity</span>
        </HeaderBlockContainer>
        <HeaderBlockContainer>
          <span>Price</span>
        </HeaderBlockContainer>
        <HeaderBlockContainer>
          <span>Remove</span>
        </HeaderBlockContainer>
      </CheckoutHeaderContainer>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <ClearButtonContainer
        className="clear"
        onClick={() => {
          dispatch(clearAllItemsFromCart());
        }}
      >
        Clear All
      </ClearButtonContainer>
      <TotalContainer>Total : {cartTotal}</TotalContainer>
      <PaymentForm />
    </CheckoutContainer>
  );
};

export default Checkout;
