import templateCardProduct from './template/CardProduct.hbs';
import products from './BD/products';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import axios from 'axios';
import { Notify } from 'notiflix';

// core version + navigation, pagination modules:
import Swiper from 'swiper';
import 'swiper/swiper-bundle.min.css';

import templateReviews from './template/reviews.hbs';
import reviews from './BD/reviews';

// init Swiper:
new Swiper('.swiper');

new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
});

document
  .querySelector('.catalog-list')
  .insertAdjacentHTML('beforeend', templateCardProduct(products));

document
  .querySelector('.swiper-wrapper')
  .insertAdjacentHTML('beforeend', templateReviews(reviews));

document
  .querySelector('#fotter-form')
  .addEventListener('submit', onSendMessageTelegram);

function onSendMessageTelegram(e) {
  e.preventDefault();

  let numberPhone = `<b>!!Заявка с сайта(футтер)!!</b>\nНомер телефона: <b>${this.phone.value}</b>`;

  const token =
    process.env.TOKEN || '6150030403:AAEvKg9VqjBFZCz59AJ6Bjb3UQ_mZ1DwT5w';
  const chat = process.env.CHATID || '-1001872926354';

  axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
    parse_mode: 'html',
    chat_id: chat,
    text: numberPhone,
  });

  document.querySelector('#fotter-form').reset();
  Notify.success(`Спасибо за заказ :) Менеджер скоро с вами свяжится`);
}
