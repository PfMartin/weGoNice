<template>
  <div class="author-detail">
    <div v-if="author" class="author-card">
      <div class="card-content">
        <div class="img-container">
          <img :src="author.imageUrl" />
        </div>
        <h1>{{ author.name }}</h1>
        <h2>{{ author.firstname }} {{ author.lastname }}</h2>
      </div>
    </div>
    <div v-else>
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
};

init();
</script>

<style scoped lang="scss">
@import '@/styles/outline.scss';
@import '@/styles/colors.scss';

.author-detail {
  margin: 1rem;
  margin-left: $nav-bar-width;
  display: flex;
  justify-content: center;

  .author-card {
    width: 80%;
    background: $bg-color-mid;
    border-radius: $border-radius;
    border: 1px solid $bg-color-mid;
    color: $text-color;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    .card-content {
      width: 80%;
      background: $bg-color-dark;
      border-radius: $border-radius;
      padding: 1rem;
    }

    .img-container {
      display: flex;
      justify-content: center;

      img {
        border-radius: $border-radius;
        max-height: 300px;
      }
    }

    h1 {
      text-align: center;
    }
  }
}
</style>
