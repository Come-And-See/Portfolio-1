

import templateCardProduct from './template/CardProduct.hbs';
import products from './Product/products';
console.log('products:', products);

const refs = {
  catalog: document.querySelector('.catalog-list'),
};

refs.catalog.insertAdjacentHTML('beforeend', templateCardProduct(products));
