//@desc: fn to get decimal (десятичное число)
export const setDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);

export const updateCart = (state) => {
  //@desc - calculation of items' price
  state.itemsPrice = setDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  //@desc - calculation of shipping price: item price > 100 -> free
  state.shippingPrice = setDecimals(state.itemsPrice > 100 ? 0 : 20);

  //@desc - calculation of tax price (15%)
  state.taxPrice = setDecimals(Number(state.itemsPrice * 0.15).toFixed(2));

  //@desc - calculation of total price
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  localStorage.setItem('cart', JSON.stringify(state));
};
