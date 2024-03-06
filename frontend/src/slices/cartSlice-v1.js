import { createSlice } from '@reduxjs/toolkit';

//@desc: fn to get decimal (десятичное число)
const decimals = (num) => (Math.round(num * 100) / 100).toFixed(2);

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((i) => i._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((i) =>
          i._id === existItem._id ? item : i
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      //@desc - calculation of items' price
      state.itemsPrice = decimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );
      //@desc - calculation of shipping price: item price > 100 - free
      state.shippingPrice = decimals(state.itemsPrice > 100 ? 0 : 20);
      //@desc - calculation of tax price (15%)
      state.taxPrice = decimals(Number(state.itemsPrice * 0.15).toFixed(2));
      //@desc - calculation of total price
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);

      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});

//@ -- below is actions
export const { addToCart } = cartSlice.actions;
// @ -- below is reducer
export default cartSlice.reducer;
