<template>
  <div>
    <form @submit.prevent>
      <h2>Create post</h2>
      <my-input v-focus v-model="post.title" placeholder="Post title" />
      <my-input v-model="post.body" placeholder="Post body" />
      <my-button
        @click="createPost"
        style="align-self: flex-end; margin-top: 15px"
        >Create</my-button
      >
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: "",
        body: "",
      },
    };
  },
  methods: {
    createPost() {
      this.post.id = Date.now();
      this.$emit("create", this.post);
      this.post = {
        title: "",
        body: "",
      };
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
