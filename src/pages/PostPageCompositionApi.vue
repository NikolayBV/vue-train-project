<template>
  <div>
    <h1>Posts page</h1>
    <my-input v-focus v-model="searchQuery" placeholder="Search..." />
    <div class="app_btns">
      <my-button>Create post</my-button>
      <my-select :options="sortOptions" v-model="selectedSort" />
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form />
    </my-dialog>
    <post-list :posts="sortedAndSearchedPosts" v-if="!isPostsLoading" />
    <div v-else>Loading...</div>
  </div>
</template>
<script>
import PostList from "@/components/PostList.vue";
import PostForm from "@/components/PostForm.vue";
import MyDialog from "@/components/UI/MyDialog.vue";
import MyButton from "@/components/UI/MyButton.vue";
import MySelect from "@/components/UI/MySelect.vue";
import MyInput from "@/components/UI/MyInput.vue";
import { usePosts } from "@/hooks/usePosts";
import useSortedPosts from "@/hooks/useSortedPosts";
import useSortedAndSearchedPosts from "@/hooks/useSortedAndSearchedPosts";

export default {
  components: { MyInput, MySelect, MyButton, MyDialog, PostForm, PostList },
  data() {
    return {
      dialogVisible: false,
      sortOptions: [
        { value: "title", name: "Title" },
        { value: "body", name: "Body" },
      ],
    };
  },
  setup(props) {
    const { posts, totalPages, isPostsLoading } = usePosts(10);
    const { sortedPosts, selectedSort } = useSortedPosts(posts);
    const { searchQuery, sortedAndSearchedPosts } =
      useSortedAndSearchedPosts(sortedPosts);

    return {
      posts,
      totalPages,
      isPostsLoading,
      sortedPosts,
      selectedSort,
      searchQuery,
      sortedAndSearchedPosts,
    };
  },
};
</script>
<style>
.app_btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}
</style>
