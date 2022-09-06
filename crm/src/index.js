import './styles/style.css';
import App from './app/app.js';

(async () => {
    const app = new App();
    await app.start();
})();
