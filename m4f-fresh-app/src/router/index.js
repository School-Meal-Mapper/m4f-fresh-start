import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
import MFFLandingPage from "@/views/MFFLandingPage.vue";
import SponsorLandingPage from "@/views/SponsorLandingPage.vue";
import ResultsPage from "@/views/ResultsPage.vue";
import FAQPage from "@/views/FAQPage.vue";
import MapPage from "@/views/MapPage.vue";
import NotFoundPage from "@/views/NotFoundPage.vue";
import LearnFreeMealsPage from "@/views/LearnFreeMealsPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/:lang([a-z][a-z])?", // currently, any first param that is two characters is treated as a language, you could change this from a 2-char regex into a list
    name: "LanguageWrapper",
    component: {
      name: 'LanguageWrapper',
      render: h => h('router-view')
    },
    children: [
      {
        path: "",
        name: "MFFLandingPage",
        component: MFFLandingPage,
      },
      {
        path: ":sponsor/",
        name: "SponsorLandingPage",
        component: SponsorLandingPage,
        // children: [ // children are for parts of a page that change based on URL
        //   {         // you need another <router-view> component in the parents of the children
        //     path: 'results',
        //     name: 'ResultsPage',
        //     component: ResultsPage
        //   },
        //   {
        //     path: 'faq',
        //     name: 'FAQPage',
        //     component: FAQPage
        //   }
        // ,
        // {
        //   path: 'map',
        //   component: MapPage
        // }
        // ]
      },
      {
        path: ":sponsor/results", // maybe I should make results and map into children so then one page can hold all of the meal site data without reloading
        name: "ResultsPage",
        component: ResultsPage,
      },
      {
        path: ":sponsor/faq",
        name: "FAQPage",
        component: FAQPage,
      },
      {
        path: ":sponsor/map",
        name: "MapPage",
        component: MapPage,
      },
      {
        path: "*",
        name: "NotFound",
        component: NotFoundPage,
      },
      {
        path: ":sponsor/freeMeals",
        name: "LearnFreeMeals",
        component: LearnFreeMealsPage,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
