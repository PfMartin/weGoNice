<template>
  <div class="author-info">
    <div v-if="author" class="author-header">
      <div class="picture">
        <img
          v-if="author.imageUrl"
          :src="author.imageUrl"
          alt="Author Picture"
        />
        <ion-icon v-else name="person" />
      </div>
      <div class="info">
        <h1>Author Name: {{ author.name }}</h1>
        <h2>Author Details: {{ author.firstname }} {{ author.lastname }}</h2>
      </div>
    </div>
    <div v-else>
      <!-- ADD SPINNER -->
      <p>Waiting for data...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { getAuthorById } from '@/apis/weGoNice/authors';
import { ref } from 'vue';

const route = useRoute();

const author = ref<Authors.CreateAuthorBody | null>(null);

const init = async () => {
  const res = await getAuthorById(route.params.id);
  author.value = res;
  console.log(author.value);
};

init();
</script>

<style scoped lang="scss">
@import '@/styles/outline.scss';
@import '@/styles/colors.scss';

.author-info {
  margin: 1rem;
  margin-left: calc($nav-bar-width + 1rem);
  display: flex;
  background: $bg-color-mid;
  border-radius: $border-radius;
  padding: 1rem;

  .author-header {
    display: flex;
    .picture {
      border-radius: $border-radius;
      display: flex;
      height: 200px;
      align-items: center;
      justify-content: center;
      width: 200px;
      overflow: hidden;

      img {
        height: 200px;
      }

      ion-icon {
        font-size: 6rem;
        z-index: 1;
      }
    }
  }

  .author-header {
  }
}
</style>
