import MainPage from "@/pages/MainPage.vue";
import { createRouter, createWebHistory } from "vue-router";
import PostPage from "@/pages/PostPage.vue";
import AboutPage from "@/pages/AboutPage.vue";
import PostIdPage from "@/pages/PostIdPage.vue";
import PostPageWithStore from "@/pages/PostPageWithStore.vue";
import PostPageCompositionApi from "@/pages/PostPageCompositionApi.vue";

const routes = [
  {
    path: "/",
    component: MainPage,
  },
  {
    path: "/posts",
    component: PostPage,
  },
  {
    path: "/about",
    component: AboutPage,
  },
  {
    path: "/posts/:id",
    component: PostIdPage,
  },
  {
    path: "/store",
    component: PostPageWithStore,
  },
  {
    path: "/composition",
    component: PostPageCompositionApi,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
});

export default router;
