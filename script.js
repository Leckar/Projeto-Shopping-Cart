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

const cartItemClickListener = (event) => {
  // coloque seu código aqui :)
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const itemInfoOrganizer = async (itemId) => {
  const data = await fetchItem(itemId);
  const { id, title, price } = data;
  return { sku: id, name: title, salePrice: price };
};

const cartItemAttacher = async (target) => {
  const id = getSkuFromProductItem(target.parentNode);
  const data = await itemInfoOrganizer(id);
  const cartList = document.querySelector('.cart__items');
  cartList.appendChild(createCartItemElement(data));
};

const productItemListener = async () => {
  const productArr = document.querySelectorAll('.item');
  productArr.forEach((e) => {
    const bttn = e.querySelector('button');
    bttn.addEventListener('click', (t) => cartItemAttacher(t.target));
  });
};

const elementAttacher = async () => {
  const arr = await resultProcessing();
  const fatherFigure = document.querySelector('.items');
  arr.forEach((e) => {
    const child = createProductItemElement(e);
    fatherFigure.appendChild(child);
  });
};

window.onload = async () => {
  await elementAttacher();
  productItemListener();
};
