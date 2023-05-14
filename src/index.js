import templateCardProduct from './template/CardProduct.hbs';
import products from './Product/products';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import axios from 'axios';

new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
});

document
  .querySelector('.catalog-list')
  .insertAdjacentHTML('beforeend', templateCardProduct(products));

document
  .querySelector('#fotter-form')
  .addEventListener('submit', onSendMessageTelegram);

function onSendMessageTelegram(e) {
  e.preventDefault();

  let numberPhone = `<b>!!Заявка с сайта(футтер)!!</b>\nНомер телефона: <b>${this.phone.value}</b>`;

  axios.post(`https://api.telegram.org/bot${process.env.TOKEN}/sendMessage`, {
    parse_mode: 'html',
    chat_id: process.env.CHATID,
    text: numberPhone,
  });
}
