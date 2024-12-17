import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import { esAlumno } from '@/Guards/isStuden.guard';
import { esProfesor } from '@/Guards/isTeacher.guard';
import { noPasa } from '@/Guards/isNoAuthenticated.guard';
import { noPasaP } from '@/Guards/isAuthenticated.guard';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    beforeEnter: [ noPasaP ],
    component: ()=> import('../views/login/login-page.vue')
  },
  
  { path: '/pass-reset',
    name: 'PassReset',
    component:  ()=> import('../views/login/pass-reset.vue')
  },
   
  {
    path: '/pass-form/',
    name: 'PassForm',
    component: ()=> import('../views/login/pass-change-form.vue'),
            
  },
        
  {
    path: '/home-teacher/',
    name: 'HomeTeacher',
    beforeEnter: [noPasa, esProfesor],
    component: () => import('../views/teacher/home-teacher.vue'),
  },     

  {
    path: '/class-list/:userId',
    name:'ClassList',
    props: true,
    beforeEnter:  [noPasa, esProfesor],
    component: ()=> import('../views/teacher/class-list.vue'),
  },
  {
    path: '/date-list/:seccion',
    name: 'DateList',
    props: true,
    beforeEnter:  [noPasa, esProfesor],
    component: ()=>import('../views/teacher/dates-list.vue'),

  },
  {
    path: '/home-studen/',
    name: 'HomeStuden',
    beforeEnter:  [noPasa, esAlumno],
    component: () => import('../views/student/home-student.vue'),
    
  },
  {
    path: '/cam-view/:id',
    name: 'CamView',
    props: true,
    beforeEnter:  [noPasa, esAlumno],
    component: ()=> import('../views/student/cam-view.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: ()=> import('../views/Not-Found.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router
