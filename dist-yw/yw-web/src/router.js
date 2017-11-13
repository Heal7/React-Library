import { Router, Route, IndexRoute } from 'dva/router';

import Mainlayout from './framework/MainLayout';
import HomePage from './routes/HomePage';
import OrganizationPage from './routes/OrganizationPage';
import RolePage from './routes/RolePage';
import LoginPage from './routes/LoginPage';
import AboutPage from './routes/AboutPage';
import OwnPage from './routes/OwnPage';
import UserPage from './routes/UserPage';

export default function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={Mainlayout}>
        <IndexRoute component={HomePage} />
        <Route path="orgs" component={OrganizationPage} />
        <Route path="roles" component={RolePage} />
        <Route path="users" component={UserPage} />
      </Route>
      <Route path="/login" component={LoginPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/own" component={OwnPage} />
    </Router>
  );
}