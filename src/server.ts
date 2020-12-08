import 'dotenv/config';

import App from './app';
import AuthRoute from '@modules/auth/auth.route';
import ConversationsRoute from '@modules/conversations/conversations.route';
import GroupsRoute from '@modules/groups/groups.route';
import { IndexRoute } from '@modules/index';
import PostsRoute from '@modules/posts/posts.route';
import ProfileRoute from '@modules/profile/profile.route';
import UsersRoute from '@modules/users/user.route';
import { validateEnv } from '@core/utils';

validateEnv();

const routes = [
  new IndexRoute(),
  new UsersRoute(),
  new AuthRoute(),
  new ProfileRoute(),
  new PostsRoute(),
  new GroupsRoute(),
  new ConversationsRoute(),
];

const app = new App(routes);

app.listen();
