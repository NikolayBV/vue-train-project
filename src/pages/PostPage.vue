<template>
  <div>
    <h1>Posts page</h1>
    <my-input v-focus v-model="searchQuery" placeholder="Search..." />
    <div class="app_btns">
      <my-button @click="showDialog">Create post</my-button>
      <my-select :options="sortOptions" v-model="selectedSort" />
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </my-dialog>
    <post-list
      :posts="sortedAndSearchPosts"
      @remove="removePost"
      v-if="!isPostsLoading"
    />
    <div v-else>Loading...</div>
    <div v-intersection="loadMorePosts" class="observer"></div>
    <!--    <div class="page_wrapper">-->
    <!--      <div-->
    <!--        class="page"-->
    <!--        :class="{ current_page: page === pageNumber }"-->
    <!--        v-for="pageNumber in totalPages"-->
    <!--        v-bind:key="pageNumber"-->
    <!--        @click="changePage(pageNumber)"-->
    <!--      >-->
    <!--        {{ pageNumber }}-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>
<script>
import PostList from "@/components/PostList.vue";
import PostForm from "@/components/PostForm.vue";
import MyDialog from "@/components/UI/MyDialog.vue";
import MyButton from "@/components/UI/MyButton.vue";
import axios from "axios";
import MySelect from "@/components/UI/MySelect.vue";
import MyInput from "@/components/UI/MyInput.vue";

export default {
  components: { MyInput, MySelect, MyButton, MyDialog, PostForm, PostList },
  data() {
    return {
      posts: [],
      page: 1,
      limit: 10,
      totalPages: 0,
      dialogVisible: false,
      isPostsLoading: false,
      selectedSort: "",
      searchQuery: "",
      sortOptions: [
        { value: "title", name: "Title" },
        { value: "body", name: "Body" },
      ],
    };
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter((item) => item.id !== post.id);
    },
    showDialog() {
      this.dialogVisible = true;
    },
    // changePage(pageNum) {
    //   this.page = pageNum;
    // },
    async fetchPosts() {
      try {
        this.isPostsLoading = true;
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: this.page,
              limit: this.limit,
            },
          }
        );
        this.totalPages = Math.ceil(
          response.headers["x-total-count"] / this.limit
        );
        this.posts = response.data;
      } catch (e) {
        alert(e);
      } finally {
        this.isPostsLoading = false;
      }
    },
    async loadMorePosts() {
      try {
        this.page += 1;
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: this.page,
              limit: this.limit,
            },
          }
        );
        this.totalPages = Math.ceil(
          response.headers["x-total-count"] / this.limit
        );
        this.posts = [...this.posts, ...response.data];
      } catch (e) {
        alert(e);
      }
    },
  },
  mounted() {
    this.fetchPosts();
  },
  // watch: {
  //   page() {
  //     this.fetchPosts();
  //   },
  // },
  computed: {
    sortedPosts() {
      if (!this.selectedSort || !this.posts.length) return this.posts;

      return JSON.parse(JSON.stringify(this.posts)).sort((post, secondPost) =>
        post[this.selectedSort]
          .toString()
          .localeCompare(secondPost[this.selectedSort].toString())
      );
    },
    sortedAndSearchPosts() {
      return this.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
};
</script>
<style>
.app_btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}
.page_wrapper {
  display: flex;
  margin-top: 15px;
}
.page {
  border: 1px solid black;
  padding: 10px;
}
.current_page {
  border: 2px solid teal;
}
.observer {
  height: 30px;
  background: green;
}
</style>
