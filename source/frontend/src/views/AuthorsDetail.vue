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
        <div class="info-section">
          <TextInputField
            headline="Name"
            iconName="person"
            id="name"
            :initialValue="author.name || 'n/a'"
            @changed="nameChanged"
          />
          <TextInputField
            headline="Firstname"
            iconName="person"
            id="firstname"
            :initialValue="author.firstname || 'n/a'"
          />
          <TextInputField
            headline="Lastname"
            iconName="person"
            id="lastname"
            :initialValue="author.lastname || 'n/a'"
          />
        </div>
        <div class="info-section">
          <TextInputField
            headline="Website"
            iconName="earth"
            id="website"
            :initialValue="author.website || 'n/a'"
          />
          <TextInputField
            headline="Instagram"
            iconName="logo-instagram"
            id="instagram"
            :initialValue="author.instagram || 'n/a'"
          />
          <TextInputField
            headline="YouTube"
            iconName="logo-youtube"
            id="youtube"
            :initialValue="author.youTube || 'n/a'"
          />
        </div>
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
import TextInputField from '@/components/TextInputField.vue';

const route = useRoute();

const author = ref<Authors.CreateAuthorBody | null>(null);

const init = async () => {
  const res = await getAuthorById(route.params.id);
  author.value = res;
};

const nameChanged = (value: string) => {
  console.log(value);
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
    gap: 1rem;
    width: 100%;
    .picture {
      border-radius: $border-radius;
      display: flex;
      height: 200px;
      align-items: center;
      justify-content: center;
      width: 200px;
      overflow: hidden;
      background: $bg-color-light;

      img {
        height: 200px;
      }

      ion-icon {
        font-size: 6rem;
        z-index: 1;
      }
    }

    .info {
      background: $bg-color-dark;
      border-radius: $border-radius;
      color: $text-color;
      padding: 1rem;
      width: 100%;
      display: flex;
      gap: 1rem;

      .info-section {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
    }
  }
}
</style>
