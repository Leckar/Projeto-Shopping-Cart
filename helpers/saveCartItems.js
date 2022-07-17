const saveCartItems = (cart) => {
  if (cart) {
    const cartData = cart.toString();
    return localStorage.setItem('cartItems', cartData);
  }
  throw new Error('Error: Invalid argument');
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
