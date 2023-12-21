import axios from "axios";

export const postModule = {
  state: () => ({
    posts: [],
    page: 1,
    limit: 10,
    totalPages: 0,
    isPostsLoading: false,
    selectedSort: "",
    searchQuery: "",
    sortOptions: [
      { value: "title", name: "Title" },
      { value: "body", name: "Body" },
    ],
  }),
  getters: {
    sortedPosts(state: any) {
      if (!state.selectedSort || !state.posts.length) return state.posts;

      return [...state.posts].sort((post: any, secondPost: any) =>
        post[state.selectedSort]
          .toString()
          .localeCompare(secondPost[state.selectedSort].toString())
      );
    },
    sortedAndSearchPosts(state: any, getters: any) {
      return getters.sortedPosts.filter((post: any) =>
        post.title.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },
  },
  mutations: {
    setPosts(state: any, posts: Array<any>) {
      state.posts = posts;
    },
    setLoading(state: any, bool: boolean) {
      state.isPostsLoading = bool;
    },
    setPage(state: any, page: any) {
      state.page = page;
    },
    setSelectedSort(state: any, selectedSort: string) {
      state.selectedSort = selectedSort;
    },
    setTotalPages(state: any, totalPages: number) {
      state.totalPages = totalPages;
    },
    setSearchQuery(state: any, searchQuery: string) {
      state.searchQuery = searchQuery;
    },
  },
  actions: {
    async fetchPosts({ state, commit }: { state: any; commit: any }) {
      commit("setLoading", true);
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: state.page,
              limit: state.limit,
            },
          }
        );
        commit(
          "setTotalPages",
          Math.ceil(response.headers["x-total-count"] / state.limit)
        );
        commit("setPosts", response.data);
      } catch (e) {
        console.log(e);
      } finally {
        commit("setLoading", false);
      }
    },
    async loadMorePosts({ state, commit }: { state: any; commit: any }) {
      try {
        commit("setPage", (state.page += 1));
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: state.page,
              limit: state.limit,
            },
          }
        );
        commit(
          "setTotalPages",
          Math.ceil(response.headers["x-total-count"] / state.limit)
        );
        commit("setPosts", [...state.posts, ...response.data]);
      } catch (e) {
        console.log(e);
      }
    },
  },
  namespaced: true,
};
