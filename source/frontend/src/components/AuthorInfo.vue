<script setup lang="ts">
import { ref } from 'vue';
import { OperationMode } from '@/utils/constants';
import TextInputField from '@/components/TextInputField.vue';

const props = defineProps<{
  initialData: Authors.Author;
  mode: OperationMode;
}>();

const author = ref<Authors.Author>(props.initialData);

const saveChanges = (): void => {
  switch (props.mode) {
    case OperationMode.Edit:
      console.log('save edited author');
      break;
    default:
      console.log('create new author');
  }
};
</script>

<template>
  <div class="author-info">
    <div class="picture">
      <img v-if="author.imageUrl" :src="author.imageUrl" alt="Author Picture" />
      <ion-icon v-else name="person" />
    </div>
    <div class="info">
      <div class="info-section">
        <TextInputField
          headline="Name"
          iconName="person"
          id="name"
          :initialValue="author.name"
          @changed="saveChanges"
        />
        <TextInputField
          headline="Firstname"
          iconName="person"
          id="firstname"
          :initialValue="author.firstname"
          @changed="saveChanges"
        />
        <TextInputField
          headline="Lastname"
          iconName="person"
          id="lastname"
          :initialValue="author.lastname"
          @changed="saveChanges"
        />
      </div>
      <div class="info-section">
        <TextInputField
          headline="Website"
          iconName="earth"
          id="website"
          :initialValue="author.website"
          @changed="saveChanges"
        />
        <TextInputField
          headline="Instagram"
          iconName="logo-instagram"
          id="instagram"
          :initialValue="author.instagram"
          @changed="saveChanges"
        />
        <TextInputField
          headline="YouTube"
          iconName="logo-youtube"
          id="youtube"
          :initialValue="author.youTube"
          @changed="saveChanges"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/outline.scss';
@import '@/styles/colors.scss';
.author-info {
  display: flex;
  background: $bg-color-mid;
  border-radius: $border-radius;
  padding: 1rem;
  max-height: 250px;
  gap: 1rem;

  .picture {
    border-radius: $border-radius;
    display: flex;
    flex: 1;
    min-width: 250px;
    max-width: 350px;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background: $bg-color-light;

    img {
      max-height: 100%;
    }

    ion-icon {
      font-size: 6rem;
      z-index: 1;
    }
  }

  .info {
    width: 100%;
    background: $bg-color-dark;
    border-radius: $border-radius;
    color: $text-color;
    padding: 1rem;
    display: flex;
    gap: 1rem;

    .info-section {
      padding: 5px;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }
}
</style>
