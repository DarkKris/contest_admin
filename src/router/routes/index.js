import AdminPage from "pages/admin/admin";
import ReportPage from "pages/report/report";
import TeacherPage from "pages/teacher/teacher";
import ContestPage from "pages/contest/contest";
import LoginPage from "pages/login/login";
import BlankPage from "pages/blank/blank";

export default [
  {
    path: '/',
    component: BlankPage,
  },
  {
    path: '/admin',
    component: AdminPage,
  },
  {
    path: '/report',
    component: ReportPage,
  },
  {
    path: '/teacher',
    component: TeacherPage,
  },
  {
    path: '/contest',
    component: ContestPage,
  },
  {
    path: '/login',
    component: LoginPage,
  },
]