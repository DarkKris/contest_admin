import AdminPage from "pages/admin/admin";

export default [
  {
    path: '/',
    redirect: '/admin'
  },
  {
    path: '/admin',
    component: AdminPage,
  },
  {
    path: 'report',
  },
  {
    path: 'teacher',
  },
  {
    path: 'login',
  },
  {
    path: 'log',
  },
  {
    path: 'contest',
  }
]