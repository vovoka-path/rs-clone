/* eslint-disable max-len */
import './index.scss';
import './reset.css';
import './canves.scss';
import { Order } from './type';
import { questions } from './Questions';

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
const buttonQuizClick = document.querySelector('#btn-quize') as HTMLButtonElement;

button.addEventListener('click', async (e) => {
  e.preventDefault();
  const city = (document.querySelector('#city') as HTMLInputElement).value;
  const route = (document.querySelector('#route') as HTMLInputElement).value;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const package_name = (document.querySelector('#package') as HTMLInputElement).value;
  const clientEmail = (document.querySelector('#email') as HTMLInputElement).value;
  const clientMessage = (document.querySelector('#message') as HTMLInputElement).value;

  const order = {
    city,
    route,
    package_name,
    clientEmail,
    clientMessage,
    date: {
      incoming: Date.now(),
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
    console.log(error);
  }
}

document.querySelectorAll('.li').forEach((currentRow, index, primarys) => {
  currentRow.addEventListener('click', () => {
    primarys.forEach((row) => row.classList.remove('active'));
    currentRow.classList.add('active');
  });
});

let questionIndex = 0; // текущий вопрос
let route1 = 0; 
let route2 = 0; 
let route3 = 0; 
let min = 0;
let standart = 0;

// Находим элементы

const headerValue = document.querySelector('#main-quize-value') as HTMLElement;
const headerContainer = document.querySelector('#quiz-header') as HTMLElement;
const listContainer = document.querySelector('#quiz-list') as HTMLElement;
const submitBtn = document.querySelector('#quiz-submit') as HTMLElement;
const popap = document.querySelector('#popap-fixed-overlay') as HTMLElement;

function clearPage():void {
  headerContainer.innerHTML = '';
  listContainer.innerHTML = '';
  headerValue.innerHTML = '';
}

if (submitBtn) {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  submitBtn.onclick = checkAnswer;
}

function showQuestion() {
  
  const headerTemplate = '<h2 class="quiz-title">%title%</h2>';
  const title = headerTemplate.replace('%title%', questions[questionIndex].question);
  headerValue.innerHTML = `Вопрос ${questionIndex + 1} из ${questions.length}`;
  headerContainer.innerHTML = title;
  
  let answerNumber = 1;
  for (const answerText of questions[questionIndex].answers) {
    const questionTemplate = `
      <li class="shadow-lg p-3 mb-5 bg-white rounded">
          <label>
              <input value="%number%" type="radio" class="answer" name="answer">
              <span>%answer%</span>
          </label>
      </li>
    `;
    const answerHTML = questionTemplate
      .replace('%answer%', answerText)
      .replace('%number%', String(answerNumber));

    listContainer.innerHTML += answerHTML;
    answerNumber++;
  }
}

function checkAnswer() {
  console.log('checkAnswer started');
  
  const message = document.querySelector('#message') as HTMLElement;
  const checkedRadio = listContainer.querySelector('input[type="radio"]:checked') as HTMLInputElement;
  message.innerHTML = '';
  
  if (checkedRadio) {
    console.log('ok!');
  } else {
    message.innerHTML = 'Выберите вариант ответа';
    return;
  }

  const userAnswer = parseInt(checkedRadio.value);
  console.log('userAnswer =', userAnswer);

  if (questionIndex !== questions.length - 1) {

    if (questionIndex === 0) {
      if (checkedRadio.value == '1') {
        route1++;
        route2++;
      } else {
        route3++;
      }
    }
    if (questionIndex === 1) {
      if (checkedRadio.value == '1') {
        route2++;
      } else {
        route3++;
        route1++;
      }
    }
    if (questionIndex === 2) {
      if (checkedRadio.value == '1') {
        route1++;
      } else {
        route3++;
      }
    }
    if (questionIndex === 3) {
      if (checkedRadio.value == '1') {
        route2++;
      }
    }
    if (questionIndex === 4) {
      if (checkedRadio.value == '1') {
        route3++;
      }
    }
    if (questionIndex === 5) {
      if (checkedRadio.value == '1') {
        route1++;
        route2++;
      } else {
        route3++;
      }
    }

    console.log('Это НЕ последний вопрос');
    questionIndex++;
    clearPage();
    showQuestion();
    return;
  } else {
    if (questionIndex === 6) {
      if (checkedRadio.value == '1') {
        ++min;
      } else {
        ++standart;
      }
    }

    console.log('Это последний вопрос');
    clearPage();
    showResults();
  }

}
clearPage();
showQuestion();

function showResults(): void {
  console.log('showResults started');
  console.log('score маршрутов', route1, route2, route3, min, standart);
  let message = '';
  let package1 = '';
  let description = '';
  let img1 = '';
  let img2 = '';
  let img3 = '';
  let img4 = '';
  let img5 = '';
  let img6 = '';

  const resultsTemplete = `
    <div class="quiz-form answer">
      <h4 class='quiz-title-message'>Отлично! 😎👍 Вам больше подходит 
        <input id="routeQuize" value='%message%'></input>
        <input id="packageQuize" value='%package1%'></input>
      </h4>
      <p class='description'>%description%</p>
      <div class='quiz-img'>
        <img src='%img1%' alt='foto'>
        <img src='%img2%' alt='foto'>
        <img src='%img3%' alt='foto'>
        <img src='%img4%' alt='foto'>
        <img src='%img5%' alt='foto'>
        <img src='%img6%' alt='foto'>
      </div>
        <div class='quize-conteiner-row'>
            <div class='quiz-email-conteiner shadow-lg p-3 mb-5 bg-white rounded'>
              <p class='email'>Для того что-б забронировать, введите свой email</p>
              <input type="email" class="quiz-email" id="quize-email" placeholder="Ваш Email">
            </div>
            <div class="shadow p-2 mb-4 bg-white rounded">
              <textarea class="form-control" rows="2" id="messageQuize" placeholder="Ваше имя, дата съемки, контактные данные для связи, количество человек и пожелания"></textarea>
            </div>
        </div>
        <div class='btn-conteiner'>
            <button type="submit" class="btn btn-primary h-30" id="submitQuize" data-bs-dismiss="modal">Забронировать</button>
        </div>
      </div>
    </div>
  `;
  
  const maxRoute = Math.max(route1, route2, route3);
  console.log(maxRoute);
  
  if (maxRoute === route1 && min === 1) {
    message = 'Маршрут №1 - Старинная Прага';
    package1 = 'Тариф Мини (1 ч · 25 фото · 70€)';
    description = 'Атмосфера средневековых улочек Мала Страна, река Чертовка, Пражская Венеция и великолепный вид на красные крыши Праги.';
    img1 = './assets/img1_1.jpg';
    img2 = './assets/img1_2.jpg';
    img3 = './assets/img1_3.jpg';
    img4 = './assets/img1_4.jpg';
    img5 = './assets/img1_5.jpg';
    img6 = './assets/img1_6.jpg';
  } else if (maxRoute === route1 && min === 0) {
    message = 'Маршрут №1 - Старинная Прага';
    package1 = 'Тариф Стандарт (1,5 ч · 50 фото · 200€)';
    description = 'Атмосфера средневековых улочек Мала Страна, река Чертовка, Пражская Венеция и великолепный вид на красные крыши Праги.';
    img1 = './assets/img1_1.jpg';
    img2 = './assets/img1_2.jpg';
    img3 = './assets/img1_3.jpg';
    img4 = './assets/img1_4.jpg';
    img5 = './assets/img1_5.jpg';
    img6 = './assets/img1_6.jpg';
  } else if (maxRoute === route2 && min === 1) {
    message = 'Маршрут №2 - Уютная Прага - Старинная Прага';
    package1 = 'Тариф Мини (1 ч · 25 фото · 70€)';
    description = 'Сады и набережная с лебедями. Отлично подходит для съемок с детьми. Начинается прямо от метро.';
    img1 = './assets/img2_1.jpg';
    img2 = './assets/img2_2.jpg';
    img3 = './assets/img2_3.jpg';
    img4 = './assets/img2_4.jpg';
    img5 = './assets/img2_5.jpg';
    img6 = './assets/img2_6.jpg';
  } else if (maxRoute === route2 && min === 0) {
    message = 'Маршрут №2 - Уютная Прага - Старинная Прага';
    package1 = 'Тариф Стандарт (1,5 ч · 50 фото · 200€)';
    description = 'Сады и набережная с лебедями. Отлично подходит для съемок с детьми. Начинается прямо от метро.';
    img1 = './assets/img2_1.jpg';
    img2 = './assets/img2_2.jpg';
    img3 = './assets/img2_3.jpg';
    img4 = './assets/img2_4.jpg';
    img5 = './assets/img2_5.jpg';
    img6 = './assets/img2_6.jpg';
  } else if (maxRoute === route3 && min === 1) {
    message = 'Маршрут №3 - Сердце Праги';
    package1 = 'Тариф Мини (1 ч · 25 фото · 70€)';
    description = 'Самые узнаваемые достопримечательности Праги: Пражские куранты, Тынский храм и Карлов мост.';
    img1 = './assets/img3_1.jpg';
    img2 = './assets/img3_2.jpg';
    img3 = './assets/img3_3.jpg';
    img4 = './assets/img3_4.jpg';
    img5 = './assets/img3_5.jpg';
    img6 = './assets/img3_6.jpg';
  } else if (maxRoute === route3 && min === 0) {
    message = 'Маршрут №3 - Сердце Праги';
    package1 = 'Тариф Стандарт (1,5 ч · 50 фото · 200€)';
    description = 'Самые узнаваемые достопримечательности Праги: Пражские куранты, Тынский храм и Карлов мост.';
    img1 = './assets/img3_1.jpg';
    img2 = './assets/img3_2.jpg';
    img3 = './assets/img3_3.jpg';
    img4 = './assets/img3_4.jpg';
    img5 = './assets/img3_5.jpg';
    img6 = './assets/img3_6.jpg';
  }
  
  const finalMessage = resultsTemplete
    .replace('%message%', message)
    .replace('%package1%', package1)
    .replace('%description%', description)
    .replace('%img1%', img1)
    .replace('%img2%', img2)
    .replace('%img3%', img3)
    .replace('%img4%', img4)
    .replace('%img5%', img5)
    .replace('%img6%', img6);
  headerContainer.innerHTML = finalMessage;

  const buttonQuiz = document.querySelector('#submitQuize') as HTMLButtonElement;

  buttonQuiz.addEventListener('click', async (e) => {
    e.preventDefault();
    const city = (document.querySelector('#cityQuize') as HTMLInputElement).value;
    const route = (document.querySelector('#routeQuize') as HTMLInputElement).value;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const package_name = (document.querySelector('#packageQuize') as HTMLInputElement).value;
    const clientEmail = (document.querySelector('#quize-email') as HTMLInputElement).value;
    const clientMessage = (document.querySelector('#messageQuize') as HTMLInputElement).value;

    const order = {
      city,
      route,
      package_name,
      clientEmail,
      clientMessage,
      date: {
        incoming: Date.now(),
      }
    };
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    postOrder(order);
    console.log(order);
    popap.classList.add('none');
    
  });
  
  submitBtn.blur();
  submitBtn.innerHTML = 'Выход';
  submitBtn.onclick = () => history.go();

}

buttonQuizClick.addEventListener('click', () => {
  popap.classList.remove('none');

  /*window.addEventListener('scroll', (e) => {
    window.scrollTo(0, 0);
  });*/
});

