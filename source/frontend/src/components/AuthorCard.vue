<template>
  <div @click="getDetails" class="author-card">
    <div class="picture">
      <img v-if="data.imageUrl" :src="data.imageUrl" />
      <ion-icon v-else name="person" />
    </div>
    <div class="main">
      <header>
        <h3>{{ data.name || 'n/a' }}</h3>
      </header>
      <div class="body">5 recipes</div>
      <footer class="footer">
        <a v-if="data.website" :href="data.website"
          ><ion-icon name="earth"
        /></a>
        <a v-if="data.instagram" :href="data.instagram"
          ><ion-icon name="logo-instagram"
        /></a>
        <a v-if="data.youTube" :href="data.youTube"
          ><ion-icon name="logo-youTube"
        /></a>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  data: any;
}>();

const getDetails = () => {
  console.log(props.data.id);
};
</script>

<style scoped lang="scss">
@import '../styles/colors.scss';
@import '../styles/outline.scss';

.author-card {
  background: $bg-color-mid;
  border-radius: $border-radius;
  border: 1px solid $bg-color-mid;
  color: $text-color;
  padding: 0.5rem;
  display: grid;
  grid-template-columns: 100px auto;
  grid-gap: 0.5rem;
  align-items: center;
  min-height: 100px;
  transition: background-color 0.3s;
  transition: border-color 0.3s;

  &:hover {
    cursor: pointer;
    border: 1px solid $accent-color;
    background: $bg-color-dark;

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
    }

    footer {
      margin-top: 1rem;
      display: flex;
      justify-content: flex-end;

      a {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: $text-color;
        font-size: 1.3rem;
        margin-left: 2rem;
        transition: color 0.2s;

        &:hover {
          color: $accent-color;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
