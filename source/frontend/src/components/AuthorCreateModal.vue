<template lang="html">
  <div class="author-create-modal">
    <ModalComponent
      :config="config"
      @close="emit('closeModal')"
      :shouldClose="shouldClose"
    >
      <template v-slot:header>
        <h2>Add Author</h2>
      </template>

      <template v-slot:default>
        <form>
          <TextInput
            :label="{ name: 'Name', iconName: 'person' }"
            :initialValue="name"
            :inputError="nameError"
            @on-input="updateName"
          />
          <TextInput
            :label="{ name: 'Website', iconName: 'earth' }"
            :initialValue="website"
            :inputError="websiteError"
            @on-input="updateWebsite"
          />
          <TextInput
            :label="{ name: 'Instagram', iconName: 'logo-instagram' }"
            :initialValue="instagram"
            :inputError="instagramError"
            @on-input="updateInstagram"
          />
          <TextInput
            :label="{ name: 'YouTube', iconName: 'logo-youtube' }"
            :initialValue="youTube"
            :inputError="youTubeError"
            @on-input="updateYouTube"
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
import { createAuthor } from '@/apis/weGoNice/authors';
import { useStore } from 'vuex';

const emit = defineEmits<{
  (e: 'closeModal'): void;
}>();

const config: ModalConfig = {
  size: 's',
};

const store = useStore();

const name = ref('');
const nameError = ref('');
const updateName = (newValue: string): void => {
  name.value = newValue;
};

const website = ref('');
const websiteError = ref('');
const updateWebsite = (newValue: string): void => {
  website.value = newValue;
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

const shouldClose = ref(false);
const submit = async (): Promise<void> => {
  const body: Authors.CreateAuthorBody = {
    name: name.value,
    website: website.value,
    instagram: instagram.value,
    youTube: youTube.value,
  };

  const { status, data } = await createAuthor(
    body,
    store.getters['auth/sessionToken']
  );

  if (status === 201) {
    // Message for notification system
    console.log(`Successfully created author with id: ${data}`);
    shouldClose.value = true;
  } else {
    console.error(data);
  }
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
