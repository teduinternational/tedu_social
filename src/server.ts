import App from './app';
import { IndexRoute } from './modules/index';

const routes = [new IndexRoute()];

const app = new App(routes);

app.listen();
