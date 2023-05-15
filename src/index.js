import templateCardProduct from './template/CardProduct.hbs';
import products from './BD/products';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import axios from 'axios';
import { Notify } from 'notiflix';




import templateReviews from './template/reviews.hbs';
import reviews from './BD/reviews';

// init Swiper:
const swiper = new Swiper('.swiper', {
  grabCursor: true,
  slideToClickedSlide: true,
  initialSlide: 0,
  loop: true,
  centeredSlides: true,
  slidesPerView: 1.59,
  spaceBetween: 50,
  autoplay: {
    delay: 100, // Задержка между прокруткой слайдов (в миллисекундах)
    disableOnInteraction: true,
  },
});

swiper.on('slideChange', function () {
  if (swiper.activeIndex === 1) {
    // Проверяем, если активный слайд равен 1 (второй слайд)
    swiper.autoplay.stop(); // Останавливаем автопрокрутку
  }
});

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
