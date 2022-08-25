import './index.scss';
import './reset.css';

const items = document.querySelectorAll('.list-group-item');
const carousels = document.querySelectorAll('.carousel');

for (let i = 0; i < items.length; i++) {
  items[i].addEventListener('click', function () {
    for (let j = 0; j < carousels.length; j++) {
      if (i == j) {
        carousels[j].classList.remove('inactive');
      } else {
        carousels[j].classList.add('inactive');
      }
    }
  });
}