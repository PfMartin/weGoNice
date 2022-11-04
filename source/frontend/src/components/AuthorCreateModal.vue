<template lang="html">
  <div class="author-create-modal">
    <ModalComponent :config="config" @close="emit('closeModal')">
      <template v-slot:header>
        <h2>Add Author</h2>
      </template>

      <template v-slot:default>
        <form>
          <TextInput
            label="Name"
            :initialValue="name"
            :inputError="nameError"
            :on-input="updateName"
          />
          <TextInput
            label="WebsiteUrl"
            :initialValue="websiteUrl"
            :inputError="websiteUrlError"
            :on-input="updateWebsiteUrl"
          />
          <TextInput
            label="Instagram"
            :initialValue="instagram"
            :inputError="instagramError"
            :on-input="updateInstagram"
          />
          <TextInput
            label="YouTube"
            :initialValue="youTube"
            :inputError="youTubeError"
            :on-input="updateYouTube"
          />
        </form>
      </template>

      <template v-slot:footer>
        <div class="save-button">
          <ButtonComponent
            buttonText="Add Author"
            buttonIconName="add"
            @on-click="submit"
          />
        </div>
      </template>
    </ModalComponent>
  </div>
</template>

<script setup lang="ts">
import ModalComponent, { ModalConfig } from '@/components/ModalComponent.vue';
import { defineEmits, ref } from 'vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import TextInput from '@/components/TextInput.vue';

const emit = defineEmits<{
  (e: 'closeModal'): void;
}>();

const config: ModalConfig = {
  size: 's',
};

const name = ref('');
const nameError = ref('');
const updateName = (newValue: string): void => {
  name.value = newValue;
};
const websiteUrl = ref('');
const websiteUrlError = ref('');
const updateWebsiteUrl = (newValue: string): void => {
  websiteUrl.value = newValue;
};
const instagram = ref('');
const instagramError = ref('');
const updateInstagram = (newValue: string): void => {
  instagram.value = newValue;
};
const youTube = ref('');
const youTubeError = ref('');
const updateYouTube = (newValue: string): void => {
  youTube.value = newValue;
};

const submit = (): void => {
  console.log('create author');
};
</script>

<style scoped lang="scss">
@import '../styles/colors.scss';
@import '../styles/outline.scss';

form {
  display: flex;
  flex-direction: column;
  padding: 1rem;
}

.save-button {
  display: flex;
  justify-content: flex-end;
}
</style>
