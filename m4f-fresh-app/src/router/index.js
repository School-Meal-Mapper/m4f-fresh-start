import Vue from 'vue';
import VueRouter from 'vue-router';
// import Home from "../views/Home.vue";
import MFFLandingPage from '@/views/MFFLandingPage.vue';
import SponsorLandingPage from '@/views/SponsorLandingPage.vue';
// import ResultsPage from '@/views/ResultsPage.vue';
import FAQPage from '@/views/FAQPage.vue';
// import MapPage from '@/views/MapPage.vue';
import LearnFreeMealsPage from '@/views/LearnFreeMealsPage.vue';
import MenuAndInfoPage from '@/views/MenuAndInfoPage.vue';
import SchoolMealsPage from '@/views/SchoolMealsPage.vue';
import GroceriesPage from '@/views/GroceriesPage.vue';
import HelpAndConnectPage from '@/views/HelpAndConnectPage.vue';
import NotFoundPage from '@/views/NotFoundPage.vue';
import SponsorNotFoundPage from '@/views/SponsorNotFoundPage.vue';

import DataWrapper from '@/views/DataWrapper.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/:lang([a-z][a-z])?', // currently, any first param that is two characters is treated as a language, you could change this from a 2-char regex into a list
    name: 'LanguageWrapper',
    component: {
      name: 'LanguageWrapper',
      render: (h) => h('router-view')
    },
    children: [
      {
        path: '',
        name: 'MFFLandingPage',
        component: MFFLandingPage
      },
      {
        path: ':sponsor/',
        name: 'SponsorLandingPage',
        component: SponsorLandingPage
      },
      {
        path: ':sponsor/freeMeals',
        name: 'LearnFreeMealsPage',
        component: LearnFreeMealsPage
      },
      {
        path: ':sponsor/menuInfo',
        name: 'MenuAndInfoPage',
        component: MenuAndInfoPage
      },
      {
        path: ':sponsor/schoolMeals',
        name: 'SchoolMealsPage',
        component: SchoolMealsPage
      },
      {
        path: ':sponsor/groceries',
        name: 'GroceriesPage',
        component: GroceriesPage
      },
      {
        path: ':sponsor/helpAndConnect',
        name: 'HelpAndConnectPage',
        component: HelpAndConnectPage
      },
      {
        path: ':sponsor/:view(list|map|details)/:search?',
        name: 'DataWrapper',
        component: DataWrapper,
        props: (route) => ({ initialSearch: route.params.search })
      },
      {
        path: ':sponsor/faq',
        name: 'FAQPage',
        component: FAQPage
      },
      {
        path: 'sponsornotfound/:sponsorname?',
        name: 'SponsorNotFoundPage',
        component: SponsorNotFoundPage
      },
      {
        path: '*',
        name: 'NotFound',
        component: NotFoundPage
      }
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
