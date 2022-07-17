const dataLoader = () => {
  const data = getSavedCartItems();
  if (!data) return;
  const ol = document.querySelector('ol.cart__items');
  ol.innerHTML = data;
};
const resultProcessing = async () => {
  const obj = await fetchProducts('computador');
  const { results } = obj;
  const arr = results.map(({ id, price, title, thumbnail }) => {
    const list = { sku: id, salePrice: price, name: title, image: thumbnail };
    return list;
  });
  return arr;
};

const toPrecisionArgChecker = (value) => {
  const valueArr = value.toString().split('.');
  if (valueArr.length > 1) {
    const stringToCheck = valueArr[1].substring(0, 2);
    console.log(stringToCheck);
    if (stringToCheck !== '00') {
      return (valueArr[0].length + 2);
    }
  }
  return valueArr[0].length;
};

const valueCounter = () => {
  const cartList = document.querySelectorAll('.cart__item');
  const counter = document.querySelector('.total-price');
  let value = 0;
  if (cartList.length > 0) {
    cartList.forEach((e) => {
      value += parseFloat(e.id, 10);
    });
    const valueString = value.toPrecision(toPrecisionArgChecker(value));
    if (valueString[valueString.length - 1] !== '0') {
      counter.innerText = valueString;
      return;
    }
    counter.innerText = valueString.slice(0, -1);
    return;
  }
  counter.innerText = '0';
};

const eraseCarthandler = () => {
  const ol = document.querySelector('ol.cart__items');
  ol.innerHTML = '';
  valueCounter();
  saveCartItems();
};

const eraseCartListener = () => {
  const eraseBttn = document.querySelector('.empty-cart');
  eraseBttn.onclick = eraseCarthandler;
};

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemHandler = ({ target }) => {
  const parent = target.parentNode;
  target.remove();
  valueCounter();
  saveCartItems(parent.innerHTML);
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.id = `${salePrice}`;
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.onclick = cartItemHandler;
  return li;
};

const itemInfoGetter = async (target) => {
  const itemId = getSkuFromProductItem(target.parentNode);
  const data = await fetchItem(itemId);
  const { id, title, price } = data;
  return { sku: id, name: title, salePrice: price };
};

const productItemHandler = async ({ target }) => {
  const data = await itemInfoGetter(target);
  const cartList = document.querySelector('.cart__items');
  const newCartItem = createCartItemElement(data);
  cartList.appendChild(newCartItem);
  valueCounter();
  saveCartItems(cartList.innerHTML);
};

const productItemListener = () => {
  const productArr = document.querySelectorAll('.item');
  productArr.forEach((e) => {
    const bttn = e.querySelector('button');
    bttn.onclick = productItemHandler;
  });
};

const elementAttacher = async () => {
  const arr = await resultProcessing();
  const parentNode = document.querySelector('.items');
  arr.forEach((e) => {
    const child = createProductItemElement(e);
    parentNode.appendChild(child);
  });
};

const windowLoadCartListener = async () => {
  const cartList = document.querySelectorAll('.cart__item');
  if (cartList && cartList.length > 0) {
    cartList.forEach((e) => {
      e.onclick = cartItemHandler;
    });
  }
};

window.onload = async () => {
  await elementAttacher();
  productItemListener();
  dataLoader();
  windowLoadCartListener();
  valueCounter();
  eraseCartListener();
};
