import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import UserView from "../views/UserView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        title: "Home",
      },
    },
    {
      path: "/user/:id",
      name: "userView",
      component: UserView,
      meta: {
        title: "User",
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | The Learning App`;
  next();
});

export default router;
