import Home from '../views/Home.vue'

const Register = () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
const Login = () => import(/* webpackChunkName: "login" */ '../views/Login.vue')

const Profile = () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue')
const Lessons = () => import(/* webpackChunkName: "lessons" */ '../views/Lessons.vue')
const Lesson = () => import(/* webpackChunkName: "lesson" */ '../views/Lesson.vue')
const NotFound = () => import(/* webpackChunkName: "404" */ '../views/NotFound.vue')

export const publicPages = ['/', '/login', '/register']

export const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/lessons',
    name: 'lessons',
    component: Lessons,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/lesson/:id',
    name: 'lesson',
    component: Lesson,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound
  }
]
