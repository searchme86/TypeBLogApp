// import IRoute from '../interface/route';
import HomePage from '../pages/Home';
import LoginPage from '../pages/Login';
import EditPage from '../pages/Edit';
import BlogPage from '../pages/Blog';

const authRoutes = [
  {
    name: 'Login',
    path: '/login',
    // exact: true,
    component: LoginPage,
    auth: false,
  },
  {
    name: 'Sign Up',
    path: '/register',
    // exact: true,
    component: LoginPage,
    auth: false,
  },
];

const blogRoutes = [
  {
    name: 'Create',
    path: '/edit',
    // exact: true,
    component: EditPage,
    auth: true,
  },
  {
    name: 'Edit',
    path: '/edit/:blogID',
    // exact: true,
    component: EditPage,
    auth: true,
  },
  {
    name: 'Blog',
    path: '/blogs/:blogID',
    // exact: true,
    component: BlogPage,
    auth: false,
  },
];

const mainRoutes = [
  {
    name: 'Home',
    path: '/',
    // exact: true,
    component: HomePage,
    auth: false,
  },
];

const routes = [...authRoutes, ...blogRoutes, ...mainRoutes];
export default routes;
