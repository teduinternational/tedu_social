import 'dotenv/config';

import App from './app';
import { IndexRoute } from '@modules/index';
import { validateEnv } from '@core/utils';

validateEnv();

const routes = [new IndexRoute()];

const app = new App(routes);

app.listen();
