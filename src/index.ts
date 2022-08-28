import './index.scss';
import './reset.css';
import { Order } from './type';

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

const button = document.querySelector('#submit') as HTMLButtonElement;

button.addEventListener('click', async (e) => {
  e.preventDefault();
  const city = (document.querySelector('#city') as HTMLInputElement).value;
  const route = (document.querySelector('#route') as HTMLInputElement).value;
  const packages = (document.querySelector('#package') as HTMLInputElement).value;
  const clientEmail = (document.querySelector('#email') as HTMLInputElement).value;
  const clientMessage = (document.querySelector('#message') as HTMLInputElement).value;

  const order = {
    city,
    route,
    packages,
    clientEmail,
    clientMessage,
    date: {
      incomingOrder: Date.now(),
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  postOrder(order);
  console.log(order);
});



async function postOrder(data: Order): Promise<void> {
  try {
    await fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    //console.log(error.message);
  }
}
