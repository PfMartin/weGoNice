<script setup lang="ts">
import { getImage } from '@/apis/weGoNice/files';
import { computed, onMounted, ref } from 'vue';
import SpinnerComponent from '@/components/SpinnerComponent.vue';

const props = defineProps<{
  data: Recipes.Recipe;
}>();

const prepTime = computed(() => {
  const timeHours = props.data.timeHours;
  const hourText = timeHours ? `${timeHours}h ` : '';

  const timeMinutes = props.data.timeMinutes;
  const minuteText = `${timeMinutes || 0}min`;

  return `${hourText}${minuteText}`;
});

const authorName = computed(() => {
  if (!props.data.author) {
    return 'n/a';
  }

  const { name, firstName, lastName } = props.data.author;

  const displayedName = name ? name : `${firstName} ${lastName}`;
  const charLimit = 20;

  return displayedName.length > charLimit
    ? `${displayedName.slice(0, charLimit)}...`
    : displayedName;
});

const img = ref('');
onMounted(async () => {
  const res = await getImage(props.data.imageName);
  img.value = res as string;
});
</script>

<template>
  <div class="recipe-card">
    <div class="picture">
      <ion-icon v-if="!data.imageName" name="image" />
      <img v-if="img" :src="img" />
      <SpinnerComponent size="small" v-else />
    </div>
    <div class="main">
      <h3>{{ data.name || 'n/a' }}</h3>
      <div class="prep-time">
        <ion-icon name="stopwatch" />
        <p>{{ prepTime }}</p>
      </div>
      <div class="prep-time">
        <ion-icon name="person" />
        <p>{{ authorName }}</p>
      </div>
      <div class="prep-time">
        <ion-icon name="fast-food" />
        <p>{{ data.category }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/colors.scss';
@import '@/styles/outline.scss';

.recipe-card {
  background: $bg-color-mid;
  padding: 0.5rem;
  border-radius: $border-radius;
  border: 2px solid $bg-color-mid;
  color: $text-color;
  padding: 0.5rem;
  width: 200px;
  justify-content: center;
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
    margin: auto;
    margin-bottom: 0.5rem;
    display: flex;
    height: 120px;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border-radius: $border-radius;

    img {
      height: 100%;
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
    background: $bg-color-dark;
    padding: 0.5rem;
    border-radius: $border-radius;
    transition: background-color 0.3s;
    flex-direction: column;
    gap: 0.2rem;

    h3 {
      padding: 0;
      margin: 0.5rem 0;
      height: 45px;
      overflow: hidden;
    }

    .prep-time {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      p {
        margin: 0;
        padding: 0;
      }
    }
  }
}
</style>
