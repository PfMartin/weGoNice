<script setup lang="ts">
import { getImage } from '@/apis/weGoNice/files';
import { onMounted, ref } from 'vue';
import SpinnerComponent from '@/components/SpinnerComponent.vue';

const props = defineProps<{
  data: Authors.Author;
}>();

const img = ref('');
onMounted(async () => {
  const res = await getImage(props.data.imageName);
  img.value = res as string;
});
</script>

<template>
  <div class="author-card">
    <div class="picture">
      <ion-icon v-if="!data.imageName" name="person" />
      <img v-else-if="img" :src="img" />
      <SpinnerComponent size="small" v-else />
    </div>
    <div class="main">
      <header>
        <h3>{{ data.name || 'n/a' }}</h3>
      </header>
      <div class="body">
        <p>{{ data.firstName || '' }} {{ data.lastName || '' }}</p>
      </div>
      <footer class="footer">
        <div class="recipes-count">
          <p>{{ data.recipeCount }} recipes</p>
        </div>
        <div class="social-media" @click.stop>
          <a v-if="data.website" :href="data.website"
            ><ion-icon name="earth"
          /></a>
          <a v-if="data.instagram" :href="data.instagram"
            ><ion-icon name="logo-instagram"
          /></a>
          <a v-if="data.youTube" :href="data.youTube"
            ><ion-icon name="logo-youTube"
          /></a>
        </div>
      </footer>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/colors.scss';
@import '@/styles/outline.scss';

.author-card {
  background: $bg-color-mid;
  border-radius: $border-radius;
  border: 2px solid $bg-color-mid;
  color: $text-color;
  padding: 0.5rem;
  display: grid;
  grid-template-columns: 100px auto;
  grid-gap: 0.5rem;
  align-items: center;
  min-height: 100px;
  width: 380px;
  transition: all 0.3s;
  box-shadow: $shadow;

  &:hover {
    cursor: pointer;
    background-color: $bg-color-dark;
    border-color: $accent-color;

    .main {
      background: $bg-color-mid;
    }
  }

  .picture {
    display: flex;
    height: 100px;
    justify-content: center;
    align-items: center;
    width: 100px;
    overflow: hidden;
    border-radius: $border-radius;

    img {
      height: 100px;
      border-radius: $border-radius;
    }

    ion-icon {
      font-size: 6rem;
      color: $bg-color-light;
      z-index: 1;
    }
  }

  .main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: $bg-color-dark;
    padding: 0.5rem;
    border-radius: $border-radius;
    height: calc(100% - 1rem);
    transition: background-color 0.3s;

    header {
      h3 {
        padding: 0;
        margin: 0;
      }
    }

    .body {
      font-size: 0.9rem;

      p {
        margin: 0;
        padding: 0;
      }
    }

    footer {
      margin-top: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .recipes-count {
        margin: 0;
        padding: 0;

        p {
          margin: 0;
          padding: 0;
        }
      }

      .social-media {
        display: flex;
        justify-content: flex-end;
        gap: 0.5rem;

        a {
          display: flex;
          align-items: center;
          text-decoration: none;
          color: $text-color;
          font-size: 1.3rem;
          transition: color 0.2s;

          &:hover {
            color: $accent-color;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
