<template>
  <div class="post">
    <div style="display: flex; flex-direction: column">
      <div>{{ post.id }}</div>
      <div>
        <strong>Title:</strong>
        {{ post.title }}
      </div>
      <div>
        <strong>Body:</strong>
        {{ post.body }}
      </div>
    </div>
    <div class="post__btns">
      <my-button @click="$emit('remove', post)">Remove</my-button>
      <my-button @click="$router.push(`/posts/${post.id}`)">Open</my-button>
    </div>
  </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton.vue";

export default {
  components: { MyButton },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.post {
  padding: 15px;
  border: 2px solid teal;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.post__btns {
  display: flex;
}
</style>
