import 'dotenv/config';

import App from './app';
import AuthRoute from '@modules/auth/auth.route';
import { IndexRoute } from '@modules/index';
import UsersRoute from '@modules/users/user.route';
import { validateEnv } from '@core/utils';

validateEnv();

const routes = [new IndexRoute(), new UsersRoute(), new AuthRoute()];

const app = new App(routes);

app.listen();
