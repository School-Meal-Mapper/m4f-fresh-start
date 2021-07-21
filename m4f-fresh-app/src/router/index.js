import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
import MFFLandingPage from "@/views/MFFLandingPage.vue";
import SponsorLandingPage from "@/views/SponsorLandingPage.vue";
import ResultsPage from "@/views/ResultsPage.vue";
import FAQPage from "@/views/FAQPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "MFFLandingPage",
    component: MFFLandingPage,
  },
  {
    path: "/:sponsor",
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
    path: "/:sponsor/results",
    name: "ResultsPage",
    component: ResultsPage,
  },
  {
    path: "/:sponsor/faq",
    name: "FAQPage",
    component: FAQPage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
