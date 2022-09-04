import { createOrders, randomDate } from "../../utils/utils.js";
import {  Chart,
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle } from '../../node_modules/chart.js/dist/chart.mjs';
import Container from "../Container/Container.js";
import Header from "../Header/Header.js";
import Select from "../Select/Select.js";
Chart.register(ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle);
  

class Statistics{
    constructor(props, container) {
        this.props = props;
        this.cabContainer = container;
        this.currentFilter = 'За весь период';
        this.allOrders = createOrders(10000);
        this.orders = this.allOrders;
    }

    create(){ 
        this.cabContainer.innerHTML = '';
        this.createDateFilter(this.currentFilter);
        this.createAllOrdersChart();
        this.createCanceledOrders();
        this.createFamouseRoutesChart();
        this.createFamousePackageChart();
        this.createBestPhotographerChart();
    }

    rerenderStatsWithFilter(){
        const dateNow = new Date(Date.now());

        if(this.currentFilter === 'За весь период'){
            this.orders = this.allOrders;
        } else if(this.currentFilter === 'За последние три месяца') {
            this.orders = this.allOrders.filter((order) => new Date(order.date.completed) >=  new Date(dateNow).setMonth(dateNow.getMonth() - 3));
        } else if(this.currentFilter === 'Текущий месяц'){
            this.orders = this.allOrders.filter((order) => new Date(order.date.completed) >=  new Date(dateNow).setMonth(dateNow.getMonth() - 1));
        }

        this.create();
    }

    createDateFilter(current){ 
        const input = Select.create('chartDate__filter', 'chartDatefilter', ['За весь период', 'За последние три месяца', 'Текущий месяц']);

        input.addEventListener('change', ()=> {
            const actualValue = input.value;
            this.currentFilter = actualValue;
            this.rerenderStatsWithFilter();
        });

        if(current) {
            input.value = current;
        }

        this.cabContainer.append(input);
    }

   
    createAllOrdersChart(){
        const allOrdersChartContainer = Container.create('allOrdersChart__container', Header.create(2, 'Помесячная статистика выполненных заказов', 'chart-title'));

        const years = {};
        
        this.orders.forEach((order) => {
            if(!years[order.date.incoming.getFullYear()]){
                years[order.date.incoming.getFullYear()] = {};
            } else if(!years[order.date.incoming.getFullYear()][order.date.incoming.getMonth()]) {
                years[order.date.incoming.getFullYear()][order.date.incoming.getMonth()] = 1;
            } else {
                years[order.date.incoming.getFullYear()][order.date.incoming.getMonth()] += 1;
            }
        });

        const monthName = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        const dataOrdersPairs = {};

        for(let year in years) {
            for(let month in years[year]) {
                const key = `${year}-${monthName[month]}`;
                const value = years[year][month];
                dataOrdersPairs[key] = value;
            }
        }

        const canvas = document.createElement('canvas');
        canvas.className = 'allOrders__chart';
        canvas.id = 'allOrdersChart';
        canvas.getContext('2d');

        const myChart = new Chart(canvas, {
            type: 'line',
            data: {
                datasets: [{
                    label: 'Заказов в месяц',
                    data: dataOrdersPairs,
                    backgroundColor: 'rgba(22,117,148,1)'
                }],
            },
        });

        allOrdersChartContainer.append(canvas);
        this.cabContainer.append(allOrdersChartContainer);

    }


     createCanceledOrders(){
        const canceledOrdersChartContainer = Container.create('canceledOrdersChart__container', Header.create(2, 'Соотношение выполненных заказов к отмененным', 'chart-title'));

        const allOrdersCount = this.orders.length;
        const canceledOrders = this.orders.filter((order) => order.date['canceled'] === null).length;

        console.log(allOrdersCount, canceledOrders);
        const canvas = document.createElement('canvas');
        canvas.className = 'canceledOrders__chart';
        canvas.id = 'canceledOrdersChart';
        canvas.getContext('2d');

        const myChart = new Chart(canvas, {
            type: 'doughnut',
            data: {
                datasets:[{
                    data: [allOrdersCount - canceledOrders, canceledOrders],
                    backgroundColor: [
                        'rgb(64, 255, 96)',
                        'rgb(255, 56, 56)'
                    ]
                }],
                labels: [
                    'Выполненные заказы',
                    'Отмененные заказы'
                ],
                
            }
        });

        canceledOrdersChartContainer.append(canvas);
        this.cabContainer.append(canceledOrdersChartContainer);
     }

     createFamouseRoutesChart(){
        const famouseRoutesChartContainer = Container.create('famouseRoutesChart__container', Header.create(2, 'Популярность маршрутов', 'chart-title'));

        const routeOne = this.orders.filter((order) => order.route === 'Маршрут №1 - Старинная Прага').length;
        const routeTwo = this.orders.filter((order) => order.route === 'Маршрут №2 - Уютная Прага').length;
        const routeThree = this.orders.filter((order) => order.route === 'Маршрут №3 - Сердце Праги').length;

        const canvas = document.createElement('canvas');
        canvas.className = 'famouseRoutes__chart';
        canvas.id = 'famouseRoutesChart';
        canvas.getContext('2d');

        const myChart = new Chart(canvas, {
            type: 'doughnut',
            data: {
                datasets:[{
                    data: [routeOne, routeTwo, routeThree],
                    backgroundColor: [
                        'rgb(248, 250, 115)',
                        'rgb(255, 178, 130)',
                        'rgb(61, 252, 157)',
                    ]
                }],
                labels: [
                    'Маршрут №1 - Старинная Прага',
                    'Маршрут №2 - Уютная Прага',
                    'Маршрут №3 - Сердце Праги'
                ],
                
            }
        });

        famouseRoutesChartContainer.append(canvas);
        this.cabContainer.append(famouseRoutesChartContainer);
     }

     createFamousePackageChart() {
        const famousePackageChartContainer = Container.create('famousePackageChart__container', Header.create(2, 'Популярность пакетов', 'chart-title'));
        
        const routeOne = this.orders.filter((order) => order.packege_name === 'Тариф Мини').length;
        const routeTwo = this.orders.filter((order) => order.packege_name === 'Тариф Стандарт').length;
        const routeThree = this.orders.filter((order) => order.packege_name === 'Тариф Элит').length;

        const canvas = document.createElement('canvas');
        canvas.className = 'famousePackage__chart';
        canvas.id = 'famousePackageChart';
        canvas.getContext('2d');

        const myChart = new Chart(canvas, {
            type: 'doughnut',
            data: {
                datasets:[{
                    data: [routeOne, routeTwo, routeThree],
                    backgroundColor: [
                        'rgb(107, 179, 255)',
                        'rgb(255, 252, 94)',
                        'rgb(243, 71, 252)',
                    ]
                }],
                labels: ['Тариф Мини', 'Тариф Стандарт', 'Тариф Элит'],
                
            }
        });

        famousePackageChartContainer.append(canvas);
        this.cabContainer.append(famousePackageChartContainer);
     }

     createBestPhotographerChart(){
        const bestPhotographerChartContainer = Container.create('bestPhotographerChart__container', Header.create(2, 'Распределенние заказов по фотографам', 'chart-title'));
        ['Андрей Фомин', 'Вася Пупкин', 'Александр Кузьмин', 'Валерий Миладзе'];
        const photographerOne = this.orders.filter((order) => order.photographer === 'Андрей Фомин').length;
        const photographerTwo = this.orders.filter((order) => order.photographer === 'Вася Пупкин').length;
        const photographerThree = this.orders.filter((order) => order.photographer === 'Александр Кузьмин').length;
        const photographerFour = this.orders.filter((order) => order.photographer === 'Валерий Миладзе').length;


        const canvas = document.createElement('canvas');
        canvas.className = 'bestPhotographer__chart';
        canvas.id = 'bestPhotographerChart';
        canvas.getContext('2d');

        const myChart = new Chart(canvas, {
            type: 'bar',
            data: {
                datasets:[{
                    label: 'Всего проведено съемок',
                    data: [photographerOne, photographerTwo, photographerThree, photographerFour],
                    backgroundColor: [
                        'rgb(135, 3, 3)',
                        'rgb(135, 133, 3)',
                        'rgb(5, 135, 3)',
                        'rgb(3, 133, 135)',
                    ],
                    
                }],
                labels: ['Андрей Фомин', 'Вася Пупкин', 'Александр Кузьмин', 'Валерий Миладзе'],
                
            }
        });

        bestPhotographerChartContainer.append(canvas);
        this.cabContainer.append(bestPhotographerChartContainer);
     }


}

export default Statistics;