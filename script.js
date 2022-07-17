const resultProcessing = async () => {
  const obj = await fetchProducts('computador');
  const { results } = obj;
  const arr = results.map(({ id, price, title, thumbnail }) => {
    const list = { sku: id, salePrice: price, name: title, image: thumbnail };
    return list;
  });
  return arr;
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
  parent.removeChild(target);
  saveCartItems(parent.innerHTML);
};

const cartItemClickListener = (event) => {
  const item = event;
  item.onclick = cartItemHandler;
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const itemInfoGetter = async (target) => {
  const itemId = getSkuFromProductItem(target.parentNode);
  const data = await fetchItem(itemId);
  const { id, title, price } = data;
  return { sku: id, name: title, salePrice: price };
};

const productItemHandler = async (target) => {
  const data = await itemInfoGetter(target);
  const cartList = document.querySelector('.cart__items');
  const newCartItem = createCartItemElement(data);
  cartList.appendChild(newCartItem);
  saveCartItems(cartList.innerHTML);
  cartItemClickListener(newCartItem);
};

const productItemListener = async () => {
  const productArr = document.querySelectorAll('.item');
  productArr.forEach((e) => {
    const bttn = e.querySelector('button');
    bttn.addEventListener('click', (t) => productItemHandler(t.target));
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

const windowLoadCartListener = () => {
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
  getSavedCartItems();
  windowLoadCartListener();
};
