<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { OperationMode } from '@/utils/constants';
import TextInputField from '@/components/TextInputField.vue';
import ValidationService from '@/services/validation.service';
import { updateAuthorById } from '@/apis/weGoNice/authors';
import { useRoute } from 'vue-router';
import notificationService from '@/services/notification.service';

const props = defineProps<{
  initialData: Authors.Author;
  mode: OperationMode;
}>();

const emit = defineEmits<{
  (e: 'on-change', body: Authors.Author): void;
}>();

const hasPictureOverlay = ref(false);
const togglePictureOverlay = () => {
  hasPictureOverlay.value = !hasPictureOverlay.value;
};

/* Handle File Input */
const fileInput = ref<HTMLInputElement | null>(null);
const openUploadWindow = () => {
  fileInput.value?.click();
};

const getFilename = () => {
  const pathArray = fileInput.value?.value.split('\\') || [];
  const fileName = pathArray[pathArray.length - 1];

  return fileName ? fileName : 'No file chosen...';
};

/* Handle User Input */
const name = ref(props.initialData.name);
const updateName = (newValue: string) => {
  name.value = newValue;
  emitInput();
};

const firstname = ref(props.initialData.firstname);
const updateFirstname = (newValue: string): void => {
  firstname.value = newValue;
  emitInput();
};

const lastname = ref(props.initialData.lastname);
const updateLastname = (newValue: string): void => {
  lastname.value = newValue;
  emitInput();
};

const website = ref(props.initialData.website);
const updateWebsite = (newValue: string) => {
  website.value = newValue;
  emitInput();
};

const instagram = ref(props.initialData.instagram);
const updateInstagram = (newValue: string) => {
  instagram.value = newValue;
  emitInput();
};

const youTube = ref(props.initialData.youTube);
const updateYouTube = (newValue: string) => {
  youTube.value = newValue;
  emitInput();
};

const imageName = ref(props.initialData.imageName);

/* Validation */
const validationService = new ValidationService();

const nameError = ref('');
const validateName = (): void => {
  nameError.value = validationService.validateAuthorName(name.value);
};

const websiteError = ref('');
const validateWebsite = (): void => {
  websiteError.value = validationService.validateWebsite(website.value);
};

const instagramError = ref('');
const validateInstagram = (): void => {
  instagramError.value = validationService.validateInstagram(instagram.value);
};

const youTubeError = ref('');
const validateYouTube = (): void => {
  youTubeError.value = validationService.validateYouTube(youTube.value);
};

const isValid = computed((): boolean => {
  validateName();
  validateWebsite();
  validateInstagram();
  validateYouTube();

  return (
    !nameError.value &&
    !websiteError.value &&
    !instagramError.value &&
    !youTubeError.value
  );
});

/* Emit Input */
const route = useRoute();
const emitInput = async (): Promise<void> => {
  if (!isValid.value) {
    return;
  }

  const body = {
    name: name.value,
    firstname: firstname.value,
    lastname: lastname.value,
    website: website.value,
    instagram: instagram.value,
    youTube: youTube.value,
    imageName: getFilename(),
  };

  if (props.mode === OperationMode.Edit) {
    const { status, data } = await updateAuthorById(route.params.id, body);

    if (status !== 200) {
      notificationService.addNotification(
        'error',
        `The author could not be updated: ${data.msg}`
      );
    }

    return;
  }

  emit('on-change', body);
};
</script>

<template>
  <div class="author-info">
    <div
      class="picture"
      @click="openUploadWindow"
      @mouseenter="togglePictureOverlay"
      @mouseleave="togglePictureOverlay"
    >
      <Transition name="fade">
        <div v-show="hasPictureOverlay" class="picture-overlay">
          <input type="file" name="picture" id="fileInput" ref="fileInput" />
          <ion-icon name="create"></ion-icon>
          <p>{{ getFilename() }}</p>
        </div>
      </Transition>
      <img v-if="imageName" :src="imageName" alt="Author Picture" />
      <ion-icon v-if="!imageName" name="person" />
    </div>
    <div class="info">
      <div class="info-section">
        <TextInputField
          headline="Name"
          iconName="person"
          id="name"
          :initialValue="name"
          placeholder="Insert the author's name"
          :inputError="nameError"
          @changed="updateName"
        />
        <TextInputField
          headline="Firstname"
          iconName="person"
          id="firstname"
          :initialValue="firstname"
          placeholder="Insert the author's firstname"
          @changed="updateFirstname"
        />
        <TextInputField
          headline="Lastname"
          iconName="person"
          id="lastname"
          :initialValue="lastname"
          placeholder="Insert the author's lastname"
          @changed="updateLastname"
        />
      </div>
      <div class="info-section">
        <TextInputField
          headline="Website"
          iconName="earth"
          id="website"
          :initialValue="website"
          :inputError="websiteError"
          placeholder="Insert author's website URL"
          @changed="updateWebsite"
        />
        <TextInputField
          headline="Instagram"
          iconName="logo-instagram"
          id="instagram"
          :initialValue="instagram"
          placeholder="Insert the author's Instagram URL"
          :inputError="instagramError"
          @changed="updateInstagram"
        />
        <TextInputField
          headline="YouTube"
          iconName="logo-youtube"
          id="youtube"
          :initialValue="youTube"
          placeholder="Insert the author's YouTube URL"
          :inputError="youTubeError"
          @changed="updateYouTube"
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
  max-height: 400px;
  gap: 1rem;
  box-shadow: $shadow;

  .picture {
    position: relative;
    border-radius: $border-radius;
    display: flex;
    flex: 1;
    min-width: 300px;
    max-width: 400px;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background: $bg-color-light;
    height: 330px;

    img {
      max-height: 100%;
    }

    .picture-overlay {
      position: absolute;
      z-index: 5;
      background: #33333399;
      height: 100%;
      width: 100%;
      border-radius: $border-radius;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      cursor: pointer;

      input {
        position: fixed;
        left: 100vw;
      }

      ion-icon {
        opacity: 1;
        font-size: 3rem;
      }
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

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease-in;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
