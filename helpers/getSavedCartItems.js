const getSavedCartItems = () => {
  const data = localStorage.getItem('cartItems');
  if (data) {
    const element = document.querySelector('ol.cart__items');
    element.innerHTML = data;
  }
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
